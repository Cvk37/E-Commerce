package com.vk.products.other;

import com.vk.products.service.DealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ExpiredDealCleaner {

    @Autowired
    private DealService dealService;

    @Scheduled(fixedRate = 360000) // Runs every hour
    public void cleanExpiredDeals() {
        dealService.deleteExpiredDeals();
    }
}