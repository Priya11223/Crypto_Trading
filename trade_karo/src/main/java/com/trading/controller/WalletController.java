package com.trading.controller;

import com.trading.domain.WalletTransactionType;
import com.trading.entity.*;
import com.trading.response.PaymentResponse;
import com.trading.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
public class WalletController {

    @Autowired
    private WalletService walletService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/api/wallet")
    public ResponseEntity<Wallet> getUserWallet() throws Exception {
        User user = userService.findUserByJwt("jwt");
        Wallet wallet = walletService.getUserWallet(user);

        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
    }

    @PutMapping("/api/wallet/{walletId}/transfer")
    public ResponseEntity<Wallet> walletToWalletTransfer(
            @PathVariable Long walletId,
            @RequestBody WalletTransaction req) throws Exception{
        User senderUser = userService.findUserByJwt("jwt");
        Wallet recieverWallet = walletService.findWalletById(walletId);
        Wallet wallet = walletService.walletToWalletTransfer(senderUser,
                recieverWallet,req.getAmount());

        transactionService.createTransaction(wallet,
                WalletTransactionType.WALLET_TRANSFER,
                recieverWallet.getId(),
                req.getPurpose(),
                req.getAmount());

        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
    }

    @PutMapping("/api/wallet/order/{orderId}/pay")
    public ResponseEntity<Wallet> payOrderPayment(
            @PathVariable Long orderId) throws Exception{
        User user = userService.findUserByJwt("jwt");

        Order order = orderService.getOrderById(orderId);
        Wallet wallet = walletService.payOrderPayment(order,user);

        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
    }

    @PutMapping("/api/wallet/deposit")
    public ResponseEntity<Wallet> addMoneyToWallet(
            @RequestParam(name = "order_id") Long orderId,
            @RequestParam(name = "payment_id") String paymentId) throws Exception{

        User user = userService.findUserByJwt("jwt");

        Wallet wallet = walletService.getUserWallet(user);

        PaymentOrder order = paymentService.getPaymentOrderById(orderId);

        boolean status = paymentService.ProceedPaymentOrder(order,paymentId);

        if(wallet.getBalance() == null)
            wallet.setBalance(BigDecimal.valueOf(0));
        if(status)
        {
            walletService.addBalance(wallet, order.getAmount());
        }

        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
    }

}
