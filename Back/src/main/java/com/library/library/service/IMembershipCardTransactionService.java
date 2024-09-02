package com.library.library.service;

import com.library.library.model.MembershipCardTransaction;

import java.util.List;

public interface IMembershipCardTransactionService {
    List<MembershipCardTransaction> getTransactionsByUserId(Long userId);
    void createTransaction(MembershipCardTransaction transaction);
    void deleteTransaction(Long transactionId);
}
