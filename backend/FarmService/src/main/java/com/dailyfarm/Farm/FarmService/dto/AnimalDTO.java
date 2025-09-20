package com.dailyfarm.Farm.FarmService.dto;

import com.dailyfarm.Farm.FarmService.enums.AnimalCategory;
import com.dailyfarm.Farm.FarmService.enums.AnimalStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class AnimalDTO {
    private String animalId;
    private String animalName;
    private String farmId;
    private String plotId;
    private String ownerId;
    private String breed;
    private int number;
    private AnimalCategory category;
    private AnimalStatus status;
    private BigDecimal age;
    private String gender;
    private BigDecimal weight;
    private BigDecimal height;
    private BigDecimal purchasePrice;
    private String motherId;
    private String fatherId;
    private String vaccinationStatus;
    private String notes;
    private Boolean isActive;
    private String animalHealth;
    private String food;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}