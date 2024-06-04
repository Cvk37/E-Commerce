package com.vk.products.service;

import com.vk.products.entity.Product;
import com.vk.products.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService{
    @Autowired
    ProductRepository productRepository;

    @Override
    public List<Product> getProducts(){
        List<Product> products = productRepository.findAll();
        return products;
    }
    public List<Product> getProductsByCategoryId(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }
    public Product getProductByName(String productName) {
        // Implement logic to retrieve a product by name from the repository
        return productRepository.findByName(productName);
    }

}
