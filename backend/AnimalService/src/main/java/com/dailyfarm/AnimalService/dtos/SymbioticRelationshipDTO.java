package com.dailyfarm.AnimalService.dtos;

import com.dailyfarm.AnimalService.enums.SymbioticType;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Data
public class SymbioticRelationshipDTO {
    private String relationshipId;
    private String farmId;
    private String ecosystemId;
    private String relationshipName;
    private SymbioticType type;
    private String description;
    private Set<String> animalIds; // Set of animal IDs (instead of full entities)
    private String cropIds; // JSON array of crop IDs
    private String plotIds; // JSON array of plot IDs
    private String benefitAnimals; // JSON object
    private String benefitCrops; // JSON object
    private String benefitSoil; // JSON object
    private String benefitEcosystem; // JSON object
    private String resourceSharing; // JSON object
    private String nutrientCycling; // JSON object
    private String pestControl; // JSON object
    private BigDecimal productivityImpact;
    private Integer sustainabilityScore;
    private BigDecimal implementationCost;
    private BigDecimal maintenanceCost;
    private BigDecimal annualSavings;
    private BigDecimal roiPercentage;
    private LocalDateTime establishedDate;
    private LocalDateTime maturityDate;
    private String successMetrics; // JSON object
    private String monitoringSchedule; // JSON object
    private Boolean isActive;
    private Boolean isSuccessful;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}