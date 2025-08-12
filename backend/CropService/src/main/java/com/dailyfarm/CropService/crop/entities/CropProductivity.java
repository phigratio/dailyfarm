package com.dailyfarm.CropService.crop.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "dailyfarm_crop_productivity")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CropProductivity {

    @Id
    @Column(name = "productivity_id")
    private String productivityId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    @Column(nullable = false)
    private LocalDateTime recordDate;

    @Column(precision = 8, scale = 2)
    private BigDecimal yieldAmount;  // e.g., kg per acre

    @Column
    private BigDecimal growthRate;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @CreationTimestamp
    private LocalDateTime createdAt;
}