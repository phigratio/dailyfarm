package com.dailyfarm.auth.service.payloads;

import com.dailyfarm.auth.service.dtos.UserDTO;
import lombok.Data;

@Data
public class JwtAuthResponse {
    private String token;
    private UserDTO user;
}