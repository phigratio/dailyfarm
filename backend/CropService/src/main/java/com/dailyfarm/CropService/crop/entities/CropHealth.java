package com.dailyfarm.CropService.crop.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "dailyfarm_crop_health")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CropHealth {

    @Id
    @Column(name = "health_id")
    private String healthId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    @Column(nullable = false)
    private LocalDateTime checkDate;

    @Column
    private String disease;  // e.g., "Fungal infection"

    @Column
    private String treatment;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @CreationTimestamp
    private LocalDateTime createdAt;
}