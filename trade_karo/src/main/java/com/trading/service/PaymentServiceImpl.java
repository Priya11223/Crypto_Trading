package com.trading.service;

import com.trading.domain.PaymentMethod;
import com.trading.domain.PaymentOrderStatus;
import com.trading.entity.PaymentOrder;
import com.trading.entity.User;
import com.trading.repository.PaymentRepository;
import com.trading.response.PaymentResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService{
    @Autowired
    private PaymentRepository paymentRepository;

    @Value("$stripe.api.key")
    private String stripeSecretKey;

    @Override
    public PaymentOrder createOrder(User user, Long amount, PaymentMethod paymentMethod) {
        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setPaymentMethod(paymentMethod);
        paymentOrder.setUser(user);
        paymentOrder.setAmount(amount);
        paymentOrder.setStatus(PaymentOrderStatus.PENDING);
        return paymentRepository.save(paymentOrder);
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long id) throws Exception {
        return paymentRepository.findById(id).orElseThrow(()-> new Exception("payment Order not found"));
    }

    @Override
    public boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId) {
        if(paymentOrder.getStatus() == null)
            paymentOrder.setStatus(PaymentOrderStatus.PENDING);
        return true;
    }

    @Override
    public PaymentResponse createRazorPaymentLink(User user, Long amount) {
        return null;
    }

    @Override
    public PaymentResponse createStripePaymentLink(User user, Long amount, Long orderId) {
        return null;
    }
}
