package com.vk.products.filters;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vk.products.entity.User;
import com.vk.products.jwt.JwtUtils;
import com.vk.products.manager.CustomAuthenticationManager;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {    
    @Autowired
    private CustomAuthenticationManager authenticationManager;
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException{
        try{
        User user =  new ObjectMapper().readValue(request.getInputStream(), User.class);
        Authentication authentication = new UsernamePasswordAuthenticationToken (user.getUsername(), user.getPassword());
        return authenticationManager.authenticate(authentication);
        }catch(IOException e){
            throw new RuntimeException(e);
        }
    }
    @Override
    public void unsuccessfulAuthentication(HttpServletRequest request,HttpServletResponse response,AuthenticationException failed) throws IOException, ServletException {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("Authentication failed, reason: " + failed.getMessage());
            response.getWriter().flush();
            System.out.println("Authentication failed");
    }
    @Override
    public void successfulAuthentication(HttpServletRequest request,HttpServletResponse response,FilterChain chain, Authentication authResult) throws IOException, ServletException {
     JwtUtils jwtUtils = new JwtUtils();
        String token = jwtUtils.generateJwtToken(authResult.getName());
        response.addHeader("Authorization", "Bearer " + token);
    }
}
