
package com.vk.products.service;
import com.vk.products.entity.Deal;
import com.vk.products.repository.DealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DealServiceImpl implements DealService {

    @Autowired
    private DealRepository dealRepository;

    @Override
    public void createDeal(Deal deal) {
        dealRepository.save(deal);
    }

    @Override
    public List<Deal> getCurrentDeals() {
        return dealRepository.findAll();
    }

    @Override
    public void deleteExpiredDeals() {
        List<Deal> deals = dealRepository.findAll();
        deals.forEach(deal -> {
            if (deal.getEndTime().isBefore(LocalDateTime.now())) {
                dealRepository.delete(deal);
            }
        });
    }
}
