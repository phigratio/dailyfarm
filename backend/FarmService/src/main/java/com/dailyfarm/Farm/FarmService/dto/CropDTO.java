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
    private String variety;
    private CropCategory category;
    private CropStatus status;
    private LocalDate plantingDate;
    private LocalDate expectedHarvestDate;
    private BigDecimal plantedArea;
    private BigDecimal seedCost;
    private BigDecimal currentValue;
    private String batchNumber;
    private String pestResistance;
    private String fertilizerNeeds;
    private String irrigationNeeds;
    private String notes;
    private Boolean isActive;
    private Boolean isOrganic;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Health fields (latest)
    private LocalDateTime healthCheckDate;
    private String disease;
    private String treatment;
    private String healthNotes;

    // Productivity fields (latest)
    private LocalDateTime productivityRecordDate;
    private BigDecimal yieldAmount;
    private BigDecimal growthRate;
    private String productivityNotes;
}
