package com.vk.products.service;

import com.vk.products.entity.Image;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ImageService {
public List<Image> getImagesByProductName(String productName);
}
