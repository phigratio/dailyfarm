package com.dailyfarm.CropService.crop.dto;

import com.dailyfarm.CropService.crop.enums.CropCategory;
import com.dailyfarm.CropService.crop.enums.CropStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
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
