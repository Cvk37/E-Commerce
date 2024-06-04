package com.vk.products.entity;

import jakarta.persistence.*;


@Entity
@Table(name="products")
public class Product {
@Id
@Column(name = "product_id",nullable = false)
private Long id;

@Column(name = "name",nullable = false)
private String name;

@Column(name = "description",nullable = false)
private String description;

@Column(name = "price",nullable = false)
private Double price;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumns({
        @JoinColumn(name = "category_id", referencedColumnName = "category_id"),
        @JoinColumn(name = "category_name", referencedColumnName = "category_name")
})
private Category category;

    public Product(Long id, String name, String description, Double price, Category category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
    }
    public Product(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
