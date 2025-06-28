package com.dailyfarm.user.service.UserService.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class FarmDto {
    private String farmId;
    private String farmName;
    private String ownerId;
    private String farmType;
    private BigDecimal totalArea;
    private BigDecimal cultivatedArea;
    private String division;
    private String district;
    private String upazila;
    private Boolean isActive;
    private Boolean isOrganic;
}


