package com.library.library.repository;

import com.library.library.model.MembershipCardTransaction;

import java.util.List;

public interface IMembershipCardTransactionRepository {
    List<MembershipCardTransaction> getTransactionsByUserId(Long userId);
    int createTransaction(MembershipCardTransaction transaction);
    int deleteTransaction(Long transactionId);
}
