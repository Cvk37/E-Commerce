package com.vk.products.entity;
import jakarta.persistence.*;

@Entity
@Table(name = "product_images")
public class Image {
    @Id
    @Column(name = "image_id",nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "product_id", referencedColumnName = "product_id"),
            @JoinColumn(name = "product_name", referencedColumnName = "name")
    })
    private Product product;

    @Column(name = "image_url")
    private String url;

    public Image(){

    }

    public Image(Long id, Product product, String url) {
        this.id = id;
        this.product = product;
        this.url = url;

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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

}