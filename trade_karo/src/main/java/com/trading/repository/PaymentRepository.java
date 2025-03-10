package com.trading.repository;

import com.trading.entity.PaymentOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<PaymentOrder, Long> {
    PaymentOrder findByUserId(Long userId);
}
