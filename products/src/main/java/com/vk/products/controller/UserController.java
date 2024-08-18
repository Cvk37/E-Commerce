package com.vk.products.controller;

import com.vk.products.Dto.UserProfileDTO;
import com.vk.products.entity.User;
import com.vk.products.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;




@CrossOrigin(originPatterns = "https://localhost:3000")
@RestController
public class UserController {
    @Autowired
    private UserService userService;

    
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@Validated @RequestBody User user) {
        userService.registerUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    
@GetMapping("/user/{username}")
public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
    User user = userService.getUser(username);
    return ResponseEntity.ok(user);
}

@GetMapping("/profile")
public ResponseEntity<UserProfileDTO> getUserProfile(@AuthenticationPrincipal UserDetails userDetails) {
    try {
        System.out.println("UserDetails: " + userDetails);
        
        // Check if userDetails is null
        if (userDetails == null) {
            System.out.println("UserDetails is null");
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        
        // Fetch user profile by username
        UserProfileDTO profileDTO = userService.getUserProfileByUsername(userDetails.getUsername());
        
        // Print profileDTO for debugging
        System.out.println("ProfileDTO: " + profileDTO);
        
        // Return the profileDTO
        return ResponseEntity.ok(profileDTO);
    } catch (Exception e) {
        // Log the exception and return a generic error response
        e.printStackTrace(); // Log the stack trace
        System.err.println("Exception occurred while fetching user profile: " + e.getMessage()); // Log the message
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

}
