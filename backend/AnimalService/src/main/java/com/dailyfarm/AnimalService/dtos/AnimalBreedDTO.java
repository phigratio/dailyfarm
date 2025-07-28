package com.dailyfarm.AnimalService.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AnimalBreedDTO {
    private String breedId;
    private String breedName;
    private String animalTypeId;
    private String description;
    private String originCountry;
    private String climateAdaptability;
    private String diseaseResistance;
    private Integer productivityRating;
    private String maintenanceLevel;
    private String specialCharacteristics; // JSON array
    private String breedingMethod;
    private String geneticMarkers; // JSON array
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}