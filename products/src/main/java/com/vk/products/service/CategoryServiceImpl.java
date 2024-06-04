package com.vk.products.service;

import com.vk.products.entity.Category;
import com.vk.products.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {


    @Autowired
    private CategoryRepository categoryRepository;


    @Override
    public List<Category> getCategories() {
        try {
            List<Category> categories = categoryRepository.findAll();
            return categories;
        } catch (Exception e) {
            throw new RuntimeException("Failed to retrieve categories: " + e.getMessage(), e);
        }
    }


}
