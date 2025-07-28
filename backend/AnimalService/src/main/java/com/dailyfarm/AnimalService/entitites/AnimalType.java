package com.dailyfarm.AnimalService.entitites;

import com.dailyfarm.AnimalService.enums.AnimalCategory;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "dailyfarm_animal_types")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnimalType {

    @Id
    @Column(name = "type_id")
    private String typeId;

    @Column(nullable = false, unique = true)
    private String typeName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AnimalCategory category;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "typical_lifespan_years")
    private Integer typicalLifespanYears;

    @Column(name = "average_weight_kg")
    private Double averageWeightKg;

    @Column(name = "gestation_period_days")
    private Integer gestationPeriodDays;

    @Column(name = "maturity_age_months")
    private Integer maturityAgeMonths;

    @Column(name = "breeding_season")
    private String breedingSeason;

    @Column(name = "feed_conversion_ratio")
    private Double feedConversionRatio;

    @Column(name = "space_requirement_sqm")
    private Double spaceRequirementSqm;

    @Column(name = "water_requirement_liters")
    private Double waterRequirementLiters;

    @Column(name = "temperature_min_celsius")
    private Double temperatureMinCelsius;

    @Column(name = "temperature_max_celsius")
    private Double temperatureMaxCelsius;

    @Column(name = "primary_products")
    private String primaryProducts; // JSON array of products

    @Column(name = "symbiotic_benefits")
    private String symbioticBenefits; // JSON array of benefits

    @Column(nullable = false)
    private Boolean isActive = true;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // Relationships
    @OneToMany(mappedBy = "animalType", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Animal> animals;

    @OneToMany(mappedBy = "animalType", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<AnimalBreed> breeds;
}