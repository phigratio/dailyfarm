package com.dailyfarm.AnimalService.dtos;

import com.dailyfarm.AnimalService.enums.AnimalCategory;
import com.dailyfarm.AnimalService.enums.AnimalStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class AnimalDTO {
    private String animalId;
    private String animalName;
    private String farmId;
    private String ownerId;
    private String animalTypeId;
    private String breedId;
    private AnimalCategory category;
    private AnimalStatus status;
    private LocalDate birthDate;
    private String gender;
    private BigDecimal weight;
    private BigDecimal height;
    private BigDecimal purchasePrice;
    private BigDecimal currentValue;
    private String identificationNumber;
    private String rfidTag;
    private String earTag;
    private String division;
    private String district;
    private String upazila;
    private String village;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String motherId;
    private String fatherId;
    private String vaccinationStatus;
    private String insurancePolicy;
    private String notes;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}