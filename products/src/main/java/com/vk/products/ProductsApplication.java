package com.vk.products;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@SpringBootApplication
@EnableScheduling
public class ProductsApplication {

	@Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }
	public static void main(String[] args) {
		SpringApplication.run(ProductsApplication.class, args);
      
	}

   


}
