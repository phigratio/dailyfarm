package com.dailyfarm.user.service.UserService.exceptions;

public class ResourceNotFoundException extends RuntimeException {

    //extra properties
    public ResourceNotFoundException() {
        super("Resource not found");
    }

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
