package com.trading.service;

import com.trading.domain.WalletTransactionType;
import com.trading.entity.Wallet;
import com.trading.entity.WalletTransaction;
import com.trading.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    public List<WalletTransaction> getTransactionsByWallet(Wallet wallet)
    {
        return transactionRepository.findByWalletId(wallet.getId());
    }

    public void createTransaction(Wallet wallet,
                                               WalletTransactionType transactionType,
                                               Long receiverId,
                                               String purpose,
                                               Long amount){
        WalletTransaction walletTransaction = new WalletTransaction();
        walletTransaction.setWallet(wallet);
        walletTransaction.setAmount(amount);
        walletTransaction.setPurpose(purpose);
        walletTransaction.setType(transactionType);
        walletTransaction.setTransferId(receiverId);

        transactionRepository.save(walletTransaction);
    }
}
