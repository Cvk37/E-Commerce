package com.vk.products.controller;

import com.vk.products.entity.Image;
import com.vk.products.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
public class ImageController {
    @Autowired
    private ImageService imageService;

    @GetMapping("/product/{productName}")
    public ResponseEntity<List<Image>> getImagesByProductId(@PathVariable String productName) {
        List<Image> images = imageService.getImagesByProductName(productName);
        return ResponseEntity.ok().body(images);
    }
}
