package com.dailyfarm.AnimalService.entitites;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "dailyfarm_animal_breeds")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnimalBreed {

    @Id
    @Column(name = "breed_id")
    private String breedId;

    @Column(nullable = false)
    private String breedName;


    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "origin_country")
    private String originCountry;

    @Column(name = "climate_adaptability")
    private String climateAdaptability;

    @Column(name = "disease_resistance")
    private String diseaseResistance;

    @Column(name = "productivity_rating")
    private Integer productivityRating; // 1-10 scale

    @Column(name = "maintenance_level")
    private String maintenanceLevel; // LOW, MEDIUM, HIGH

    @Column(name = "special_characteristics")
    private String specialCharacteristics; // JSON array

    @Column(name = "breeding_method")
    private String breedingMethod;

    @Column(name = "genetic_markers")
    private String geneticMarkers; // JSON array

    @Column(nullable = false)
    private Boolean isActive = true;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;


}
