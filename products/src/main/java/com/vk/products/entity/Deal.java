package com.vk.products.entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "deals")
public class Deal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "product_id", referencedColumnName = "product_id", insertable = false, updatable = false),
        @JoinColumn(name = "product_name", referencedColumnName = "name", insertable = false, updatable = false)
    })
    private Product product;

    @Column(name = "discount")
    private Double discount;

    

    @Column(name = "end_time")
    private LocalDateTime endTime;

    public Deal() {}

    public Deal(Long id, Double discount, LocalDateTime startTime, LocalDateTime endTime, Product product) {
        this.product = product;
        this.id = id;
        this.discount = discount;
        this.endTime = endTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

}
