package com.vk.products.service;

import com.vk.products.entity.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductService {
    List<Product> getProducts();
    public List<Product> getProductsByCategoryId(Long categoryId);
    public Product getProductByName(String productName);
}
