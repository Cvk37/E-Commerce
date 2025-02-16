package com.vk.products.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;

import com.vk.products.filters.AuthenticationFilter;
import com.vk.products.filters.JWTAuthorizationFilter;
import com.vk.products.filters.SimpleCorsFilter;
import com.vk.products.manager.CustomAuthenticationManager;
import lombok.AllArgsConstructor;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {

 
    private final JWTAuthorizationFilter jwtAuthorizationFilter;
    private final SimpleCorsFilter simpleCorsFilter;
    private final CustomAuthenticationManager customAuthenticationManager;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        AuthenticationFilter authenticationFilter = new AuthenticationFilter(customAuthenticationManager);

        http
            .cors(Customizer.withDefaults())
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/product/**", "/categories/**", "/products/**", "/deals/**").permitAll()
                .requestMatchers("/register", "/oauth2/**", "/login/oauth2/**").permitAll() // Allow OAuth2 login
                .anyRequest().authenticated()
            )
            .oauth2Login(Customizer.withDefaults())
            .httpBasic(Customizer.withDefaults())
            .addFilterBefore(simpleCorsFilter, ChannelProcessingFilter.class)
            .addFilterBefore(jwtAuthorizationFilter, AuthenticationFilter.class)
            .addFilter(authenticationFilter)
            .sessionManagement(sessionManagement -> sessionManagement
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );

        return http.build();
    }
}
