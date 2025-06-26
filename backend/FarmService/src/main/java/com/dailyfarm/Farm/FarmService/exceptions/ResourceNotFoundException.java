package com.dailyfarm.Farm.FarmService.exceptions;

public class ResourceNotFoundException extends RuntimeException {

    //extra properties
    public ResourceNotFoundException() {
        super("Resource not found");
    }

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
