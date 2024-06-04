package com.vk.products.controller;
import com.vk.products.entity.Product;
import com.vk.products.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
public class ProductController {
    @Autowired
    ProductService productService;

    @GetMapping("/categories/{categoryId}")
    public List<Product> getProductsByCategoryId(@PathVariable Long categoryId) {
        // Implement logic to retrieve products based on category_id
        return productService.getProductsByCategoryId(categoryId);
    }

    @GetMapping("/products/{productName}")
    public ResponseEntity<Product> getProductByName(@PathVariable String productName) {
        // Implement logic to retrieve a product by name
        Product product = productService.getProductByName(productName);

        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
