package com.vk.products.service;

import com.vk.products.entity.Category;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {
    List<Category> getCategories();
    // Other business methods...
}