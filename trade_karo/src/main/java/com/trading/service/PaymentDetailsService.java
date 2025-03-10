package com.trading.service;

import com.trading.entity.PaymentDetails;
import com.trading.entity.User;

public interface PaymentDetailsService {
    PaymentDetails addPaymentDetails(String accountNumber,
                                     String accountHolderName,
                                     String ifsc,
                                     String bankName,
                                     User user);

    PaymentDetails getUserPaymentDetails(User user);
}
