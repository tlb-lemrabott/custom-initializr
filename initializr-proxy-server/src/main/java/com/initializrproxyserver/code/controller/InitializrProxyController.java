package com.initializrproxyserver.code.controller;

import com.initializrproxyserver.code.service.InitializrProxyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/initializr")
public class InitializrProxyController {

    private final InitializrProxyService proxyService;

    @GetMapping("/metadata")
    public Mono<ResponseEntity<String>> getMetadata() {
        return proxyService.fetchMetadata()
                .map(json -> ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(json));
    }

    @GetMapping(value = "/starter.zip")
    public Mono<ResponseEntity<byte[]>> downloadStarter(@RequestParam MultiValueMap<String, String> allParams) {
        return proxyService.fetchStarterZip(allParams)
                .map(bytes -> ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=starter.zip")
                        .body(bytes));
    }
}
