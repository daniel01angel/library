package com.library.library.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.library.library.model.TransactionLog;
import com.library.library.repository.cosmos.TransactionLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class TransactionLogService {

    private static final Logger logger = LoggerFactory.getLogger(TransactionLogService.class);

    @Autowired
    private TransactionLogRepository transactionLogRepository;

    @Autowired
    private ObjectMapper objectMapper; // Inyección del ObjectMapper

    public void logTransaction(Long userId, List<Integer> bookIds, double amount, String ipAddress) {
        try {
            TransactionLog log = new TransactionLog();
            log.setId(UUID.randomUUID().toString());
            log.setUserId(userId);
            log.setTransactionDateTime(OffsetDateTime.now());
            log.setBookIds(bookIds);
            log.setAmount(amount);
            log.setIpAddress(ipAddress);

            // Imprime el objeto en el log para inspeccionarlo
            logger.info("Datos del TransactionLog antes de guardar: {}", log);

            // Código de prueba de serialización/deserialización
            try {
                String json = objectMapper.writeValueAsString(log);
                TransactionLog deserializedLog = objectMapper.readValue(json, TransactionLog.class);
                System.out.println("Serialización y deserialización exitosa");
            } catch (Exception e) {
                e.printStackTrace();
            }

            transactionLogRepository.save(log);
        } catch (Exception e) {
            logger.error("Failed to insert transaction log: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to insert transaction log", e);
        }
    }
}