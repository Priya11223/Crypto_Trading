package com.trading.service;

import com.trading.domain.VerificationType;
import com.trading.entity.ForgetPasswordToken;
import com.trading.entity.User;

public interface ForgetPasswordService {
    ForgetPasswordToken createToken(User user,
                                    String id, String otp,
                                    VerificationType verificationType,
                                    String sendTo);

    ForgetPasswordToken findById(String id);

    ForgetPasswordToken findByUser(Long userId);

    void deleteToken(ForgetPasswordToken token);

}
