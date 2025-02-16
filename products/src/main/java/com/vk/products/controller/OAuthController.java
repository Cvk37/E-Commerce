package com.vk.products.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Map;

import com.vk.products.entity.User;
import com.vk.products.repository.UserRepository;
import com.vk.products.jwt.JwtUtils;

@RestController
@RequestMapping("/oauth")
public class OAuthController {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String redirectUri;

    private final UserRepository userRepository;
    private final JwtUtils jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public OAuthController(UserRepository userRepository, JwtUtils jwtUtil, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/google")
    public ResponseEntity<Void> redirectToGoogle() {
        String authUrl = "https://accounts.google.com/o/oauth2/v2/auth"
                + "?client_id=" + clientId
                + "&redirect_uri=" + redirectUri
                + "&response_type=code"
                + "&scope=openid email profile";

        return ResponseEntity.status(HttpStatus.FOUND).header(HttpHeaders.LOCATION, authUrl).build();
    }

    @GetMapping("/google/callback")
    public ResponseEntity<?> handleGoogleCallback(@RequestParam String code) {
        String tokenEndpoint = "https://oauth2.googleapis.com/token";
        RestTemplate restTemplate = new RestTemplate();

        // Exchange authorization code for access token
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        String body = "code=" + code
                + "&client_id=" + clientId
                + "&client_secret=" + clientSecret
                + "&redirect_uri=" + redirectUri
                + "&grant_type=authorization_code";

        HttpEntity<String> request = new HttpEntity<>(body, headers);
        @SuppressWarnings("unchecked")
        ResponseEntity<Map<String, Object>> tokenResponse = restTemplate.exchange(
                tokenEndpoint, HttpMethod.POST, request, (Class<Map<String, Object>>) (Class<?>) Map.class);

        if (!tokenResponse.getStatusCode().is2xxSuccessful() || tokenResponse.getBody() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Failed to authenticate with Google");
        }

        String accessToken = (String) tokenResponse.getBody().get("access_token");

        // Fetch user info from Google
        String userInfoEndpoint = "https://www.googleapis.com/oauth2/v3/userinfo";
        HttpHeaders authHeaders = new HttpHeaders();
        authHeaders.setBearerAuth(accessToken);
        HttpEntity<String> entity = new HttpEntity<>(authHeaders);
        @SuppressWarnings("unchecked")
        ResponseEntity<Map<String, Object>> userInfoResponse = restTemplate.exchange(
                userInfoEndpoint, HttpMethod.GET, entity, (Class<Map<String, Object>>) (Class<?>) Map.class);

        if (!userInfoResponse.getStatusCode().is2xxSuccessful() || userInfoResponse.getBody() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Failed to retrieve user info");
        }

        Map<String, Object> userInfo = userInfoResponse.getBody();
        String email = (String) userInfo.get("email");
        String name = (String) userInfo.get("name");

        // Find user by email
        User user = userRepository.findByEmail(email);
        if (user == null) {
            // Create a new user
            user = new User();
            user.setEmail(email);
            user.setFirstName(name);
            user.setPassword(passwordEncoder.encode("GOOGLE_AUTH")); // Placeholder password
            userRepository.save(user);
        }

        // Generate JWT token
        String jwt = jwtUtil.generateJwtToken(user.getUsername());

        return ResponseEntity.ok(Map.of("jwt", jwt, "user", user));
    }
}