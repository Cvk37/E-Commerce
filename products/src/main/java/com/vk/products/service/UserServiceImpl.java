package com.vk.products.service;

import com.vk.products.entity.User;
import com.vk.products.exception.UserNotFoundException;
import com.vk.products.repository.UserRepository;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
private UserRepository userRepository;


   @Override
    public User registerUser(User user) {
        // Save the user to the database
        return userRepository.save(user);
    }
    
    @Override
    public User getUser(String username) {
        User user = userRepository.findByUsername(username);
        System.out.println(user);
        if (user == null) {
            
            throw new UserNotFoundException("User not found with username: " + username);
            
        }
        return user;
    }
    


    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}
