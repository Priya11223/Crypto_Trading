package com.trading.service;

import com.trading.domain.VerificationType;
import com.trading.entity.User;
import com.trading.entity.VerificationCode;

public interface VerificationCodeService {
    VerificationCode sendVerificationOtp(User user, VerificationType verificationType);

    VerificationCode getVerificationCodeById(Long id) throws Exception;

    VerificationCode getVerificationCodeByUserId(Long UserId);

    void deleteVerificationCodeById(VerificationCode verificationCode);
}
