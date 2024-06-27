package com.vk.products.service;

import com.vk.products.entity.Deal;

import java.util.List;

public interface DealService {
    void createDeal(Deal deal);
    List<Deal> getCurrentDeals();
    void deleteExpiredDeals();
}
