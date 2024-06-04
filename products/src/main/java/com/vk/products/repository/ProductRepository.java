package com.vk.products.repository;

import com.vk.products.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long>{
    List<Product> findByCategoryId(Long categoryId);
    Product findByName(String name);
}
