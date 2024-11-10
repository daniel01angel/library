package com.library.library.config;

import com.azure.cosmos.CosmosClientBuilder;
import com.azure.cosmos.ConsistencyLevel;
import com.azure.spring.data.cosmos.config.AbstractCosmosConfiguration;
import com.azure.spring.data.cosmos.config.CosmosConfig;
import com.azure.spring.data.cosmos.core.ResponseDiagnosticsProcessor;
import com.azure.spring.data.cosmos.core.ResponseDiagnostics;
import com.azure.spring.data.cosmos.core.convert.MappingCosmosConverter;
import com.azure.spring.data.cosmos.core.mapping.CosmosMappingContext;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ComponentScan;
import com.azure.spring.data.cosmos.repository.config.EnableCosmosRepositories;

@Configuration
@EnableCosmosRepositories(basePackages = "com.library.library.repository.cosmos")
public class CosmosDbConfig extends AbstractCosmosConfiguration {

    @Value("${spring.data.cosmos.uri}")
    private String cosmosUri;

    @Value("${spring.data.cosmos.key}")
    private String cosmosKey;

    @Value("${spring.data.cosmos.database}")
    private String cosmosDatabase;

    private final ObjectMapper objectMapper;

    public CosmosDbConfig(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Bean
    public CosmosClientBuilder cosmosClientBuilder() {
        return new CosmosClientBuilder()
                .endpoint(cosmosUri)
                .key(cosmosKey)
                .consistencyLevel(ConsistencyLevel.EVENTUAL);
    }

    @Bean
    public CosmosConfig cosmosConfig() {
        return CosmosConfig.builder()
                .responseDiagnosticsProcessor(new ResponseDiagnosticsProcessorImplementation())
                .build();
    }

    @Override
    protected String getDatabaseName() {
        return cosmosDatabase;
    }

    @Bean
    public MappingCosmosConverter mappingCosmosConverter(CosmosMappingContext mappingContext) {
        return new MappingCosmosConverter(mappingContext, objectMapper);
    }

    public static class ResponseDiagnosticsProcessorImplementation implements ResponseDiagnosticsProcessor {

        @Override
        public void processResponseDiagnostics(ResponseDiagnostics responseDiagnostics) {
            // Implementa tu lógica aquí si lo deseas
        }
    }
}