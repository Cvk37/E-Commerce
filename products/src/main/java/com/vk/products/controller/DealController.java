package com.vk.products.controller;

import com.vk.products.entity.Deal;
import com.vk.products.service.DealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/deals")
public class DealController {

    @Autowired
    private DealService dealService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void createDeal(@RequestBody Deal dealRequest) {
        dealService.createDeal(dealRequest);
    }

    @GetMapping
    public List<Deal> getDeals() {
        return dealService.getCurrentDeals();
    }
}
