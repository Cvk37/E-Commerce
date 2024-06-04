package com.vk.products.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id", nullable = false)
    private Long id;

    @Column(name = "category_name", length = 100, nullable = false)
    private String name;

    @Column(name = "description") // Added missing comma
    private String description;

        @Column(name = "tax_rate")
        private double taxRate;

        // Constructors, getters, and setters
        public Category() {
            // Default constructor
        }

        public Category(Long id, String name, String description, double taxRate) {
            this.id = id ;
            this.name = name;
            this.description = description;
            this.taxRate = taxRate;
        }

        public Long getCategoryId() {
            return id;
        }

        public void setCategoryId(Long id) {
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

    public double getTaxRate() {
        return taxRate;
    }

    public void setTaxRate(double taxRate) {
        this.taxRate = taxRate;
    }
}



