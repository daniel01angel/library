package com.library.library.service;

import com.library.library.model.MembershipCardTransaction;
import com.library.library.repository.IMembershipCardTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MembershipCardTransactionService implements IMembershipCardTransactionService {

    @Autowired
    private IMembershipCardTransactionRepository iMembershipCardTransactionRepository;

    @Override
    public List<MembershipCardTransaction> getTransactionsByUserId(Long userId) {
        try {
            return iMembershipCardTransactionRepository.getTransactionsByUserId(userId);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving transactions for user ID: " + userId, e);
        }
    }

    @Override
    public void createTransaction(MembershipCardTransaction transaction) {
        try {
            int rowsInserted = iMembershipCardTransactionRepository.createTransaction(transaction);
            if (rowsInserted == 0) {
                throw new RuntimeException("Failed to create transaction for user ID: " + transaction.getUserId());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error creating transaction", e);
        }
    }

    @Override
    public void deleteTransaction(Long transactionId) {
        try {
            int rowsDeleted = iMembershipCardTransactionRepository.deleteTransaction(transactionId);
            if (rowsDeleted == 0) {
                throw new RuntimeException("Failed to delete transaction with ID: " + transactionId);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error deleting transaction", e);
        }
    }
}