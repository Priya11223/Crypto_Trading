package com.trading.controller;

import com.trading.entity.PaymentDetails;
import com.trading.entity.User;
import com.trading.service.PaymentDetailsService;
import com.trading.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PaymentDetailsController {
    @Autowired
    private UserService userService;
    @Autowired
    private PaymentDetailsService pdService;

    @PostMapping("/payment-details")
    public ResponseEntity<PaymentDetails> addPaymentDetails(@RequestBody PaymentDetails pdRequest) throws Exception {
        User user = userService.findUserByJwt("jwt");
        PaymentDetails paymentDetails = pdService.addPaymentDetails(pdRequest.getAccountNumber(),
                pdRequest.getAccountHolderName(),
                pdRequest.getIfsc(),
                pdRequest.getBankName(),
                user);
        return new ResponseEntity<>(paymentDetails, HttpStatus.CREATED);
    }

    @GetMapping("/payment-details")
    public ResponseEntity<PaymentDetails> getUsersPaymentDetails() throws Exception {
        User user = userService.findUserByJwt("jwt");
        PaymentDetails paymentDetails = pdService.getUserPaymentDetails(user);
        return new ResponseEntity<>(paymentDetails, HttpStatus.OK);
    }
}
