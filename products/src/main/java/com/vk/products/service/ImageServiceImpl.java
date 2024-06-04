package com.vk.products.service;

import com.vk.products.entity.Image;
import com.vk.products.repository.ImageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageServiceImpl implements ImageService{
    private final ImageRepository imageRepository;

    public ImageServiceImpl(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Override
    public List<Image> getImagesByProductName(String productName) {
        return imageRepository.findByProductName(productName);
    }
}
