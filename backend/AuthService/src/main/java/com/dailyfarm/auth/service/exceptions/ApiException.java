package com.dailyfarm.auth.service.exceptions;

public class ApiException extends RuntimeException {
    public ApiException(String message) {
        super(message);
    }
}