package com.trading.service;

import com.trading.domain.PaymentMethod;
import com.trading.entity.PaymentOrder;
import com.trading.entity.User;
import com.trading.response.PaymentResponse;

public interface PaymentService {
    PaymentOrder createOrder(User user, Long amount, PaymentMethod paymentMethod);

    PaymentOrder getPaymentOrderById(Long id) throws Exception;

    boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId);

    PaymentResponse createRazorPaymentLink(User user, Long amount);

    PaymentResponse createStripePaymentLink(User user, Long amount, Long orderId);
}
