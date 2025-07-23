package com.dailyfarm.auth.service.dtos;

import com.dailyfarm.auth.service.enums.RoleEnum;
import com.dailyfarm.auth.service.enums.UserStatus;
import lombok.Data;

@Data
public class UserDTO {
    private String userId;
    private String userName;
    private String email;
    private String password;
    private String phoneNumber;
    private String division;
    private String district;
    private String upazila;
    private String village;
    private String about;
    private RoleEnum role;
    private UserStatus status;
    // No password field for security
}