package com.dailyfarm.AnimalService.dtos;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class AnimalProductivityDTO {
    private String productivityId;
    private String animalId;
    private LocalDate recordDate;
    private String productType;
    private BigDecimal quantity;
    private String unit;
    private String qualityGrade;
    private Integer qualityScore;
    private BigDecimal productionCost;
    private BigDecimal marketPrice;
    private BigDecimal revenue;
    private BigDecimal profit;
    private BigDecimal feedConsumedKg;
    private BigDecimal waterConsumedLiters;
    private BigDecimal feedEfficiency;
    private String productionSeason;
    private String environmentalFactors; // JSON string
    private String symbioticContribution; // JSON string
    private String notes;
    private Boolean isOrganic;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}