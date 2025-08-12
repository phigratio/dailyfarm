package com.dailyfarm.Farm.FarmService.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class FarmDTO {
    private String farmId;
    private String farmName;
    private String ownerId;
    private String farmType;
    private double totalArea;
    private double cultivatedArea;
    private String division;
    private String district;
    private String upazila;
    private boolean isActive;
    private boolean isOrganic;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
