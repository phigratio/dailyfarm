package com.dailyfarm.AnimalService.entitites;

import com.dailyfarm.AnimalService.enums.AnimalCategory;
import com.dailyfarm.AnimalService.enums.AnimalStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

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
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "animal_id", updatable = false, nullable = false)
    private String animalId;

    @Column(nullable = false)
    private String animalName;

    @Column(nullable = false)
    private String farmId;

    @Column(nullable = false)
    private String plotId;

    @Column(nullable = false)
    private String ownerId;

    @Column(nullable = false)
    private int number;

    private String breed;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AnimalCategory category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AnimalStatus status;

    @Column(nullable = false)
    private BigDecimal age;

    @Column(nullable = false)
    private String gender;

    @Column(precision = 8, scale = 2)
    private BigDecimal weight;

    @Column(precision = 8, scale = 2)
    private BigDecimal height;

    @Column(precision = 10, scale = 2)
    private BigDecimal purchasePrice;

    @Column(name = "mother_id")
    private String motherId;

    @Column(name = "father_id")
    private String fatherId;

    @Column(name = "vaccination_status")
    private String vaccinationStatus;

    private String food;

    @Column(columnDefinition = "TEXT")
    private String notes;


    private Boolean isActive = true;

    private String animalHealth;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
