package com.library.library.model;

import com.azure.spring.data.cosmos.core.mapping.Container;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.List;

@Data
@Container(containerName = "transactionLogs")
@JsonIgnoreProperties(ignoreUnknown = true)
public class TransactionLog {
    @Id
    private String id;
    private Long userId;
    private OffsetDateTime transactionDateTime;
    private List<Integer> bookIds;
    private double amount;
    private String ipAddress;
}
