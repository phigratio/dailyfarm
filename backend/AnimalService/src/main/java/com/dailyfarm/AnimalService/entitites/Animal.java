package com.dailyfarm.AnimalService.entitites;

import com.dailyfarm.AnimalService.enums.AnimalCategory;
import com.dailyfarm.AnimalService.enums.AnimalStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "dailyfarm_animals")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Animal {

    @Id
    @Column(name = "animal_id")
    private String animalId;

    @Column(nullable = false)
    private String animalName;

    @Column(nullable = false)
    private String farmId;

    @Column(nullable = false)
    private String ownerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_type_id", nullable = false)
    private AnimalType animalType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "breed_id")
    private AnimalBreed breed;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AnimalCategory category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AnimalStatus status;

    @Column(nullable = false)
    private LocalDate birthDate;

    @Column(nullable = false)
    private String gender;

    @Column(precision = 8, scale = 2)
    private BigDecimal weight;

    @Column(precision = 8, scale = 2)
    private BigDecimal height;

    @Column(precision = 10, scale = 2)
    private BigDecimal purchasePrice;

    @Column(precision = 10, scale = 2)
    private BigDecimal currentValue;

    @Column(name = "identification_number", unique = true)
    private String identificationNumber;

    @Column(name = "rfid_tag")
    private String rfidTag;

    @Column(name = "ear_tag")
    private String earTag;

    @Column(nullable = false)
    private String division;

    @Column(nullable = false)
    private String district;

    @Column(nullable = false)
    private String upazila;

    private String village;

    @Column(precision = 10, scale = 6)
    private BigDecimal latitude;

    @Column(precision = 10, scale = 6)
    private BigDecimal longitude;

    @Column(name = "mother_id")
    private String motherId;

    @Column(name = "father_id")
    private String fatherId;

    @Column(name = "vaccination_status")
    private String vaccinationStatus;

    @Column(name = "insurance_policy")
    private String insurancePolicy;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(nullable = false)
    private Boolean isActive = true;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // Relationships
    @OneToMany(mappedBy = "animal", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<AnimalHealth> healthRecords;

    @OneToMany(mappedBy = "animal", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<AnimalProductivity> productivityRecords;

    @ManyToMany(mappedBy = "animals", fetch = FetchType.LAZY)
    private Set<SymbioticRelationship> symbioticRelationships;

    // Calculated fields
    public int getAgeInDays() {
        return java.time.Period.between(birthDate, LocalDate.now()).getDays();
    }

    public int getAgeInMonths() {
        return java.time.Period.between(birthDate, LocalDate.now()).getMonths();
    }

    public int getAgeInYears() {
        return java.time.Period.between(birthDate, LocalDate.now()).getYears();
    }
}