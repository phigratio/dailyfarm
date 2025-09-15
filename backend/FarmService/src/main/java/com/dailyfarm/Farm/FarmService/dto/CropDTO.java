package com.dailyfarm.Farm.FarmService.dto;

import com.dailyfarm.Farm.FarmService.enums.CropCategory;
import com.dailyfarm.Farm.FarmService.enums.CropStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;


@Data
public class CropDTO {
    private String cropId;
    private String cropName;
    private String farmId;
    private String plotId;
    private String ownerId;
    private CropCategory category;
    private CropStatus status;
    private LocalDate plantingDate;
    private LocalDate expectedHarvestDate;
    private BigDecimal plantedArea;
    private Boolean isActive;
    private Boolean isOrganic;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
