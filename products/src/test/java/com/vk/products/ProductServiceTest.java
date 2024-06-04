package com.vk.products;
import com.vk.products.entity.Product;
import com.vk.products.repository.ProductRepository;
import com.vk.products.service.ProductServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.*;
import org.mockito.junit.MockitoJUnitRunner;
import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(MockitoJUnitRunner.class)
public class ProductServiceTest {

    @Mock
    ProductRepository productRepository;

    @InjectMocks
    ProductServiceImpl productService;
    
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    @Test
    public void testGetProductByName() {
        // Arrange
        String productName = "Laptop";
        Product mockProduct = new Product(1L, productName, "High-performance laptop", 999.99,null);

        when(productRepository.findByName(productName)).thenReturn(mockProduct);

        // Act
        Product result = productService.getProductByName(productName);

        // Assert
        assertEquals("Laptop", result.getName());
        
 

        // Verify that the repository method was called
        verify(productRepository, times(1)).findByName(productName);
    }
    }
