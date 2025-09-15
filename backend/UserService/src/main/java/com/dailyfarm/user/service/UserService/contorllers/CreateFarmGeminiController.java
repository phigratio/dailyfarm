package com.dailyfarm.user.service.UserService.contorllers;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/users/api/gemini")
public class CreateFarmGeminiController {

    private static final String GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    // Hardcoded API key (replace with your actual key)
    private static final String API_KEY = "AIzaSyDNT8ExmfRDGw4ImrLh3x5WDL15lJSYeS8";

    @PostMapping("/generate")
    public ResponseEntity<String> generateContent(@RequestBody Map<String, Object> requestBody) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("x-goog-api-key", API_KEY);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(GEMINI_URL, entity, String.class);

        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }
}
