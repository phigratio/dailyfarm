package com.example.marketplace.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MarketPlaceDTO {

    private Long id;
    private String name;
    private String userId;
    private Double price;
    private String description;
    private String image;
    private String contact;
    private String amount;


}
