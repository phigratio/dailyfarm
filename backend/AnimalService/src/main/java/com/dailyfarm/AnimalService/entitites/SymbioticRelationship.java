package com.dailyfarm.AnimalService.entitites;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "dailyfarm_symbiotic_relationships")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SymbioticRelationship {

    @Id
    @Column(name = "relationship_id")
    private String relationshipId;

    @Column(name = "farm_id", nullable = false)
    private String farmId;

    @Column(name = "ecosystem_id")
    private String ecosystemId;

    @Column(name = "relationship_name", nullable = false)
    private String relationshipName;

//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    private SymbioticType type;

    @Column(columnDefinition = "TEXT")
    private String description;

    // Animals involved in the relationship


    // Crops involved in the relationship
    @Column(name = "crop_ids")
    private String cropIds; // JSON array of crop IDs

    // Plot IDs where this relationship exists
    @Column(name = "plot_ids")
    private String plotIds; // JSON array of plot IDs

    @Column(name = "benefit_animals")
    private String benefitAnimals; // JSON object describing benefits

    @Column(name = "benefit_crops")
    private String benefitCrops; // JSON object describing benefits

    @Column(name = "benefit_soil")
    private String benefitSoil; // JSON object describing soil benefits

    @Column(name = "benefit_ecosystem")
    private String benefitEcosystem; // JSON object describing ecosystem benefits

    @Column(name = "resource_sharing")
    private String resourceSharing; // JSON object

    @Column(name = "nutrient_cycling")
    private String nutrientCycling; // JSON object

    @Column(name = "pest_control")
    private String pestControl; // JSON object

    @Column(name = "productivity_impact")
    private BigDecimal productivityImpact; // Percentage impact

    @Column(name = "sustainability_score")
    private Integer sustainabilityScore; // 1-100 scale

    @Column(name = "implementation_cost")
    private BigDecimal implementationCost;

    @Column(name = "maintenance_cost")
    private BigDecimal maintenanceCost;

    @Column(name = "annual_savings")
    private BigDecimal annualSavings;

    @Column(name = "roi_percentage")
    private BigDecimal roiPercentage;

    @Column(name = "established_date")
    private LocalDateTime establishedDate;

    @Column(name = "maturity_date")
    private LocalDateTime maturityDate;

    @Column(name = "success_metrics")
    private String successMetrics; // JSON object

    @Column(name = "monitoring_schedule")
    private String monitoringSchedule; // JSON object

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "is_successful")
    private Boolean isSuccessful;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}