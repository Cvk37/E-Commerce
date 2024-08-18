package com.vk.products.service;

import com.vk.products.Dto.UserProfileDTO;
import com.vk.products.entity.User;
import com.vk.products.repository.UserRepository;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

  

   @Override
    public User registerUser(User user) {
        //encode the password before saving to the database
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    
    @Override
    public User getUser(String username) {
        User user = userRepository.findByUsername(username);
        return user;
    }
    


    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    @Override
    public UserProfileDTO getUserProfileByUsername(String username) {
        User user = getUser(username);
        return new UserProfileDTO(user);
    }
}
