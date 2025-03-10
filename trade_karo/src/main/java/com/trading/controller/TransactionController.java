package com.trading.controller;

import com.trading.entity.User;
import com.trading.entity.Wallet;
import com.trading.entity.WalletTransaction;
import com.trading.service.TransactionService;
import com.trading.service.UserService;
import com.trading.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TransactionController {
    @Autowired
    private UserService userService;
    @Autowired
    private WalletService walletService;
    @Autowired
    private TransactionService transactionService;

    @GetMapping("/api/transaction")
    public ResponseEntity<?> getUserWallet() throws Exception {
        User user = userService.findUserByJwt("");
        Wallet wallet = walletService.getUserWallet(user);

        List<WalletTransaction> transactionList = transactionService.getTransactionsByWallet(wallet);
        return new ResponseEntity<>(transactionList, HttpStatus.ACCEPTED);
    }
}
