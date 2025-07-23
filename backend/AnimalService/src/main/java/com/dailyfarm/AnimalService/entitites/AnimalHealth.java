package com.dailyfarm.AnimalService.entitites;

import com.dailyfarm.AnimalService.enums.HealthStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "dailyfarm_animal_health")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnimalHealth {

    @Id
    @Column(name = "health_id")
    private String healthId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id", nullable = false)
    private Animal animal;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private HealthStatus status;

    @Column(name = "checkup_date", nullable = false)
    private LocalDateTime checkupDate;

    @Column(name = "veterinarian_id")
    private String veterinarianId;

    @Column(name = "body_temperature")
    private BigDecimal bodyTemperature;

    @Column(name = "heart_rate")
    private Integer heartRate;

    @Column(name = "respiratory_rate")
    private Integer respiratoryRate;

    @Column(name = "blood_pressure")
    private String bloodPressure;

    @Column(name = "body_condition_score")
    private Integer bodyConditionScore; // 1-9 scale

    @Column(columnDefinition = "TEXT")
    private String symptoms;

    @Column(columnDefinition = "TEXT")
    private String diagnosis;

    @Column(columnDefinition = "TEXT")
    private String treatment;

    @Column(name = "medications")
    private String medications; // JSON array

    @Column(name = "vaccination_record")
    private String vaccinationRecord; // JSON array

    @Column(name = "next_checkup_date")
    private LocalDateTime nextCheckupDate;

    @Column(name = "treatment_cost")
    private BigDecimal treatmentCost;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "is_contagious")
    private Boolean isContagious = false;

    @Column(name = "quarantine_required")
    private Boolean quarantineRequired = false;

    @Column(name = "recovery_status")
    private String recoveryStatus;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}