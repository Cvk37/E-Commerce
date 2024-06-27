package com.vk.products.manager;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.vk.products.entity.User;
import com.vk.products.service.UserServiceImpl;

import lombok.AllArgsConstructor;


@Component
@AllArgsConstructor
public class CustomAuthenticationManager implements AuthenticationManager{
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;      
    
    private UserServiceImpl userServiceImpl;
     
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
       User user = userServiceImpl.getUser(authentication.getName());
       if(user == null) {
           throw new BadCredentialsException("Your username and password do not match!");
       }
       if(!passwordEncoder.matches(authentication.getCredentials().toString(), user.getPassword())) {
           throw new BadCredentialsException("Your username and password do not match!");
       }
       return new UsernamePasswordAuthenticationToken(authentication.getName(),user.getPassword()); 
    }
    
}
