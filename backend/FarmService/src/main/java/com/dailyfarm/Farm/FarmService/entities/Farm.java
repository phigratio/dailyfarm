package com.dailyfarm.Farm.FarmService.entities;

import com.dailyfarm.Farm.FarmService.enums.FarmType;
import com.dailyfarm.Farm.FarmService.enums.IrrigationType;
import com.dailyfarm.Farm.FarmService.enums.SoilType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="dailyfarm_farms")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Farm {

    @Id
    private String farmId;

    @Column(nullable = false)
    private String farmName;

    @Column(nullable = false)
    private String ownerId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false,length = 20)
    private FarmType farmType;


    private BigDecimal totalArea;


    private BigDecimal cultivatedArea;

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

    @Enumerated(EnumType.STRING)
    @Column(name = "soil_type",length = 20)
    private SoilType soilType;

    @Enumerated(EnumType.STRING)
    @Column(name = "irrigation_type",length = 20)
    private IrrigationType irrigationType;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Boolean isActive = true;

    @Column(nullable = false)
    private Boolean isOrganic = false;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "farm", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Plot> plots;


}
