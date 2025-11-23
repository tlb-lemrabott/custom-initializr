package com.initializrproxyserver.code.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@Service
public class InitializrProxyService {

    private final WebClient initializrClient;

    public Mono<String> fetchMetadata() {
        return initializrClient.get()
                .uri("/metadata/client")
                .accept(MediaType.valueOf("application/vnd.initializr.v2.3+json"))
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<byte[]> fetchStarterZip(MultiValueMap<String, String> params) {
        String uri = UriComponentsBuilder.fromPath("/starter.zip")
                .queryParams(params)
                .build()
                .toUriString();
        
        return initializrClient.get()
                .uri(uri)
                .retrieve()
                .bodyToMono(byte[].class);
    }
}

