package com.example.marketplace.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "marketplace")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MarketPlace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String userId;

    private Double price;

    @Column(length = 1000)
    private String description;

    private String image;

    private String contact;
    private String amount;

    // Constructors




}
