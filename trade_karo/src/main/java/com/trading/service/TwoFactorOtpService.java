package com.trading.service;

import com.trading.entity.TwoFactorOTP;
import com.trading.entity.User;

public interface TwoFactorOtpService {

    TwoFactorOTP createTwoFactorOtp(User user, String otp, String jwt);

    TwoFactorOTP findByUser(Long userId);

    TwoFactorOTP findById(String id);

    boolean verifyTwoFactorOtp(TwoFactorOTP twoFactorOTP, String Otp);

    void deleteTwoFactorOtp(TwoFactorOTP twoFactorOTP);
}
