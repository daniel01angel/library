package com.library.library.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
public class SqlServerConfig {

    @Bean
    public DataSource sqlDataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        dataSource.setUrl("jdbc:sqlserver://libraryserverproject.database.windows.net:1433;databaseName=Library");
        dataSource.setUsername("developer");
        dataSource.setPassword("SecurePassword123");
        return dataSource;
    }
}