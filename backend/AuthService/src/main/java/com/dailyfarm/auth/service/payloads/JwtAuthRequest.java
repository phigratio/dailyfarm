package com.dailyfarm.auth.service.payloads;

import lombok.Data;

@Data
public class JwtAuthRequest {
    private String username; // Actually email
    private String password;
}