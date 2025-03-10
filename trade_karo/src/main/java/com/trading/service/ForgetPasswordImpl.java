package com.trading.service;

import com.trading.domain.VerificationType;
import com.trading.entity.ForgetPasswordToken;
import com.trading.entity.User;
import com.trading.repository.ForgetPasswordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ForgetPasswordImpl implements ForgetPasswordService{

    @Autowired
    private ForgetPasswordRepository forgetPasswordRepository;

    @Override
    public ForgetPasswordToken createToken(User user,String id, String otp, VerificationType verificationType, String sendTo) {
        ForgetPasswordToken forgetPasswordToken = new ForgetPasswordToken();
        forgetPasswordToken.setOtp(otp);
        forgetPasswordToken.setUser(user);
        forgetPasswordToken.setSendTo(sendTo);
        forgetPasswordToken.setVerificationType(verificationType);
        forgetPasswordToken.setId(id);

        return forgetPasswordRepository.save(forgetPasswordToken);
    }

    @Override
    public ForgetPasswordToken findById(String id) {
        Optional<ForgetPasswordToken> token = forgetPasswordRepository.findById(id);
        return token.orElse(null);
    }

    @Override
    public ForgetPasswordToken findByUser(Long userId) {
        return forgetPasswordRepository.findByUserId(userId);
    }

    @Override
    public void deleteToken(ForgetPasswordToken token) {
        forgetPasswordRepository.delete(token);
    }
}
