package com.library.library.repository.cosmos;

import com.azure.spring.data.cosmos.repository.CosmosRepository;
import com.library.library.model.TransactionLog;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionLogRepository extends CosmosRepository<TransactionLog, String> {
    // Métodos personalizados si los tienes
}
