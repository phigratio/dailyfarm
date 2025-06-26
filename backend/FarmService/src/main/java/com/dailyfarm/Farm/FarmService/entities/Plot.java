package com.dailyfarm.Farm.FarmService.entities;

import com.dailyfarm.Farm.FarmService.enums.PlotStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "dailyfarm_plots")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Plot {

    @Id
    private String plotId;

    @Column(nullable = false)
    private String plotNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="farm_id",nullable = false)
    private Farm farm;

    @Column(nullable = false)
    private BigDecimal area;

    @Enumerated(EnumType.STRING)
    private PlotStatus status;

    private BigDecimal soilPh;
    private BigDecimal organicMatter;
    private BigDecimal nitrogen;
    private BigDecimal phosphorus;
    private BigDecimal potassium;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(nullable = false)
    private Boolean isActive = true;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
