package com.vk.products.controller;

import com.vk.products.entity.User;
import com.vk.products.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;




@CrossOrigin(originPatterns =  "https://localhost:3000")
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

}
