package com.dailyfarm.AnimalService.entitites;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "dailyfarm_animal_productivity")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnimalProductivity {

    @Id
    @Column(name = "productivity_id")
    private String productivityId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id", nullable = false)
    private Animal animal;

    @Column(name = "record_date", nullable = false)
    private LocalDate recordDate;

    @Column(name = "product_type", nullable = false)
    private String productType; // MILK, EGGS, MEAT, WOOL, etc.

    @Column(name = "quantity", precision = 10, scale = 3)
    private BigDecimal quantity;

    @Column(name = "unit")
    private String unit; // LITERS, PIECES, KILOGRAMS, etc.

    @Column(name = "quality_grade")
    private String qualityGrade; // A, B, C, PREMIUM, STANDARD

    @Column(name = "quality_score")
    private Integer qualityScore; // 1-100 scale

    @Column(name = "production_cost")
    private BigDecimal productionCost;

    @Column(name = "market_price")
    private BigDecimal marketPrice;

    @Column(name = "revenue")
    private BigDecimal revenue;

    @Column(name = "profit")
    private BigDecimal profit;

    @Column(name = "feed_consumed_kg")
    private BigDecimal feedConsumedKg;

    @Column(name = "water_consumed_liters")
    private BigDecimal waterConsumedLiters;

    @Column(name = "feed_efficiency")
    private BigDecimal feedEfficiency;

    @Column(name = "production_season")
    private String productionSeason;

    @Column(name = "environmental_factors")
    private String environmentalFactors; // JSON object

    @Column(name = "symbiotic_contribution")
    private String symbioticContribution; // JSON object

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "is_organic")
    private Boolean isOrganic = false;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}