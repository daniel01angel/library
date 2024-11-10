package com.library.library.repository;

import com.library.library.model.MembershipCardTransaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MembershipCardTransactionRepository implements IMembershipCardTransactionRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<MembershipCardTransaction> getTransactionsByUserId(Long userId) {
        String SQL = "SELECT * FROM MembershipCardTransactions WHERE UserID = ?";
        return jdbcTemplate.query(SQL, new Object[]{userId}, BeanPropertyRowMapper.newInstance(MembershipCardTransaction.class));
    }

    @Override
    public int createTransaction(MembershipCardTransaction transaction) {
        String SQL = "INSERT INTO MembershipCardTransactions (UserID, TransactionDateTime, Amount) VALUES (?, ?, ?)";
        return jdbcTemplate.update(SQL, transaction.getUserId(), transaction.getTransactionDateTime(), transaction.getAmount());
    }

    @Override
    public int deleteTransaction(Long transactionId) {
        String SQL = "DELETE FROM MembershipCardTransactions WHERE TransactionID = ?";
        return jdbcTemplate.update(SQL, transactionId);
    }
}