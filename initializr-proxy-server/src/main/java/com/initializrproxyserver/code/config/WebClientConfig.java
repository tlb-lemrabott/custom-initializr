package com.initializrproxyserver.code.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    private static final String INITIALIZR_API = "https://start.spring.io";

    @Bean
    public WebClient initializrClient() {
        return WebClient.builder()
                .baseUrl(INITIALIZR_API)
                .build();
    }
}

