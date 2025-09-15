package com.dailyfarm.Farm.FarmService.entities;

import com.dailyfarm.Farm.FarmService.enums.PlotStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
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
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String plotId;

    @Column(nullable = false)
    private String plotNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="farm_id", nullable = false)
    @JsonBackReference
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

    private BigDecimal waterPh;

    @Column(columnDefinition = "TEXT")
    private String notes;
    private String plotType;
    @Column(nullable = false)
    private Boolean isActive = true;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
