package com.dailyfarm.AnimalService.dtos;

import com.dailyfarm.AnimalService.enums.HealthStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class AnimalHealthDTO {
    private String healthId;
    private String animalId;
    private HealthStatus status;
    private LocalDateTime checkupDate;
    private String veterinarianId;
    private BigDecimal bodyTemperature;
    private Integer heartRate;
    private Integer respiratoryRate;
    private String bloodPressure;
    private Integer bodyConditionScore;
    private String symptoms;
    private String diagnosis;
    private String treatment;
    private String medications; // JSON string
    private String vaccinationRecord; // JSON string
    private LocalDateTime nextCheckupDate;
    private BigDecimal treatmentCost;
    private String notes;
    private Boolean isContagious;
    private Boolean quarantineRequired;
    private String recoveryStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}