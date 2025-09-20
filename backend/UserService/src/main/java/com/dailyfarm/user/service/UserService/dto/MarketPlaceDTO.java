package com.dailyfarm.user.service.UserService.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
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
