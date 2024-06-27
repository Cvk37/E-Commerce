package com.vk.products.entity;
import jakarta.persistence.*;


@Entity
@Table(name = "product_images")
public class Image {
    @Id
    @Column(name = "image_id",nullable = false)
    private Long id;


    @Column(name = "image_url")
    private String url;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public Image(){

    }

    public Image(Long id, String url) {
        this.id = id;
        this.url = url;

    }
 
    
   

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

}