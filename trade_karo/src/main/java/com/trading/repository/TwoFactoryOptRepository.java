package com.trading.repository;

import com.trading.entity.TwoFactorOTP;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TwoFactoryOptRepository extends JpaRepository<TwoFactorOTP, String> {
    TwoFactorOTP findByUserId(Long userId);
}
