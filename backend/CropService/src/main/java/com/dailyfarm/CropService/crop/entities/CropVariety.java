package com.dailyfarm.CropService.crop.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "dailyfarm_crop_varieties")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CropVariety {

    @Id
    @Column(name = "variety_id")
    private String varietyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_type_id", nullable = false)
    private CropType cropType;

    @Column(nullable = false, unique = true)
    private String varietyName;  // e.g., "Basmati Rice"

    @Column
    private Integer growthDurationDays;  // Average days to maturity

    @Column(precision = 8, scale = 2)
    private BigDecimal expectedYieldPerAcre;  // In kg or tons

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Boolean isActive = true;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
