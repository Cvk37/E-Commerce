package com.vk.products.service;

import com.vk.products.Dto.UserProfileDTO;
import com.vk.products.entity.User;
import org.springframework.stereotype.Service;



@Service
public interface UserService {

    User registerUser(User user);
    User findByEmail(String email);
    User getUser(String username);
    UserProfileDTO getUserProfileByUsername(String username);

}
