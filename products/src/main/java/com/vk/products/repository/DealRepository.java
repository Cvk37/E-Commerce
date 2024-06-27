package com.vk.products.repository;

import com.vk.products.entity.Deal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface DealRepository extends JpaRepository<Deal, Long> {
    List<Deal> findByEndTimeAfter(LocalDateTime currentTime);
}
