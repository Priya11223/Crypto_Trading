package com.trading.service;

import com.trading.entity.PaymentDetails;
import com.trading.entity.User;
import com.trading.repository.PaymentDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentDetailsServiceImpl implements PaymentDetailsService{
    @Autowired
    private PaymentDetailsRepository paymentDetailsRepository;

    @Override
    public PaymentDetails addPaymentDetails(String accountNumber, String accountHolderName, String ifsc, String bankName, User user) {
        PaymentDetails pD = new PaymentDetails();
        pD.setAccountNumber(accountNumber);
        pD.setAccountHolderName(accountHolderName);
        pD.setUser(user);
        pD.setIfsc(ifsc);
        pD.setBankName(bankName);
        return paymentDetailsRepository.save(pD);
    }

    @Override
    public PaymentDetails getUserPaymentDetails(User user) {
        return paymentDetailsRepository.findByUserId(user.getId());
    }
}
