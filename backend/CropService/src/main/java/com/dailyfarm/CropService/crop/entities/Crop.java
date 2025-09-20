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
    private String plotId;

    @Column(nullable = false)
    private String ownerId;

    private String variety;

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
    private BigDecimal plantedArea;

    @Column(precision = 10, scale = 2)
    private BigDecimal seedCost;

    @Column(precision = 10, scale = 2)
    private BigDecimal currentValue;

    @Column(name = "batch_number", unique = true)
    private String batchNumber;

    @Column(name = "pest_resistance")
    private String pestResistance;

    @Column(name = "fertilizer_needs")
    private String fertilizerNeeds;

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

    // Health fields (latest record)
    @Column(name = "health_check_date")
    private LocalDateTime healthCheckDate;

    @Column
    private String disease;

    @Column
    private String treatment;

    @Column(columnDefinition = "TEXT")
    private String healthNotes;

    // Productivity fields (latest record)
    @Column(name = "productivity_record_date")
    private LocalDateTime productivityRecordDate;

    @Column(precision = 8, scale = 2)
    private BigDecimal yieldAmount;

    @Column
    private BigDecimal growthRate;

    @Column(columnDefinition = "TEXT")
    private String productivityNotes;

    // Calculated field
    public int getGrowthDays() {
        return java.time.Period.between(plantingDate, LocalDate.now()).getDays();
    }
}
