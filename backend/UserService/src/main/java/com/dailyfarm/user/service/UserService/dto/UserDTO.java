package com.dailyfarm.user.service.UserService.dto;

import com.dailyfarm.user.service.UserService.enums.RoleEnum;
import com.dailyfarm.user.service.UserService.enums.UserStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserDTO {

    private String userId;
    private String userName;
    private String email;
    private String phoneNumber;
    private String division;
    private String district;
    private String upazila;
    private String village;
    private String about;
    private RoleEnum role;
    private UserStatus status = UserStatus.ACTIVE;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
