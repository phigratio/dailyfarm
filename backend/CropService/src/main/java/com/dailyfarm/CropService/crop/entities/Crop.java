package com.dailyfarm.CropService.crop.entities;

import com.dailyfarm.CropService.crop.enums.CropCategory;
import com.dailyfarm.CropService.crop.enums.CropStatus;
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
@Table(name = "dailyfarm_crops")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Crop {

    @Id
    @Column(name = "crop_id")
    private String cropId;

    @Column(nullable = false)
    private String cropName;

    @Column(nullable = false)
    private String farmId;

    @Column(nullable = false)
    private String plotId;  // Link to FarmService's Plot

    @Column(nullable = false)
    private String ownerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_type_id", nullable = false)
    private CropType cropType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "variety_id")
    private CropVariety variety;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CropCategory category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CropStatus status;

    @Column(nullable = false)
    private LocalDate plantingDate;

    @Column
    private LocalDate expectedHarvestDate;

    @Column(precision = 8, scale = 2)
    private BigDecimal plantedArea;  // In acres

    @Column(precision = 10, scale = 2)
    private BigDecimal seedCost;

    @Column(precision = 10, scale = 2)
    private BigDecimal currentValue;  // Estimated market value

    @Column(name = "batch_number", unique = true)
    private String batchNumber;

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

    @Column(name = "pest_resistance")
    private String pestResistance;  // e.g., "High to aphids"

    @Column(name = "fertilizer_needs")
    private String fertilizerNeeds;  // JSON for NPK ratios

    @Column(name = "irrigation_needs")
    private String irrigationNeeds;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(nullable = false)
    private Boolean isActive = true;

    @Column(nullable = false)
    private Boolean isOrganic = false;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // Relationships
    @OneToMany(mappedBy = "crop", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CropHealth> healthRecords;

    @OneToMany(mappedBy = "crop", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CropProductivity> productivityRecords;

    @ManyToMany(mappedBy = "crops", fetch = FetchType.LAZY)
    private Set<SymbioticRelationship> symbioticRelationships;

    // Calculated fields
    public int getGrowthDays() {
        return java.time.Period.between(plantingDate, LocalDate.now()).getDays();
    }
}
