package com.dailyfarm.Farm.FarmService.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String userId;
    private String userName;
    private String email;
    private String phoneNumber;
    private String division;
    private String district;
    private String upazila;
    private String village;
}