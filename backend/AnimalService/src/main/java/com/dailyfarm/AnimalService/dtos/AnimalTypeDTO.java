package com.dailyfarm.AnimalService.dtos;

import com.dailyfarm.AnimalService.enums.AnimalCategory;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AnimalTypeDTO {
    private String typeId;
    private String typeName;
    private AnimalCategory category;
    private String description;
    private Integer typicalLifespanYears;
    private Double averageWeightKg;
    private Integer gestationPeriodDays;
    private Integer maturityAgeMonths;
    private String breedingSeason;
    private Double feedConversionRatio;
    private Double spaceRequirementSqm;
    private Double waterRequirementLiters;
    private Double temperatureMinCelsius;
    private Double temperatureMaxCelsius;
    private String primaryProducts; // JSON array
    private String symbioticBenefits; // JSON array
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}