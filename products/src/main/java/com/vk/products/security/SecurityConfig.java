
package com.vk.products.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;

import com.vk.products.filters.AuthenticationFilter;
import com.vk.products.filters.JWTAuthorizationFilter;
import com.vk.products.filters.SimpleCorsFilter;
import com.vk.products.manager.CustomAuthenticationManager;
import com.vk.products.service.CustomUserDetailsService;

import lombok.AllArgsConstructor;


@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {
   
    @Autowired
    CustomUserDetailsService customUserDetailsService;
    
    @Autowired
    PasswordEncoder encoder;    
       
    @Autowired
    JWTAuthorizationFilter jwtAuthorizationFilter = new JWTAuthorizationFilter();
    @Autowired
    SimpleCorsFilter simpleCorsFilter;

    
    private final CustomAuthenticationManager customAuthenticationManager;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
       AuthenticationFilter authenticationFilter = new AuthenticationFilter(customAuthenticationManager);
        http
            .cors(Customizer.withDefaults())
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth ->
                auth
                    .requestMatchers("/product/**", "/categories/**", "/products/**","deals/**").permitAll()
                    .requestMatchers("POST", "/register").permitAll()
                    .anyRequest().authenticated()
                
            )
            .httpBasic(Customizer.withDefaults())
            .addFilterBefore(simpleCorsFilter, ChannelProcessingFilter.class)
            .addFilterBefore(jwtAuthorizationFilter,AuthenticationFilter.class)
            .addFilter(authenticationFilter)
            .sessionManagement(sessionManagement -> sessionManagement
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Set session creation policy
                .maximumSessions(1) // Allow only one session per user
                .maxSessionsPreventsLogin(true) // Prevent new login if maximum sessions reached
                .expiredUrl("/login?expired=true") // Redirect to login page if session expired
            );
        return http.build();
    }

    
    
    

}
