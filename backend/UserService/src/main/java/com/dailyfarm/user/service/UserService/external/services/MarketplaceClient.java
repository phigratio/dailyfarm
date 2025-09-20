package com.dailyfarm.user.service.UserService.external.services;

import com.dailyfarm.user.service.UserService.dto.MarketPlaceDTO;
import org.springframework.cloud.openfeign.FeignClient;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "MARKETPLACE-SERVICE")
public interface MarketplaceClient {
    @GetMapping("/api/marketplace")
    List<MarketPlaceDTO> getAllMarketPlaceItems();

    @GetMapping("/api/marketplace/by-user/{userId}")
    List<MarketPlaceDTO> getMarketPlaceItemsByUserId(@PathVariable("userId") String userId);

    @PostMapping("/api/marketplace")
    MarketPlaceDTO saveMarketPlaceItem(@RequestBody MarketPlaceDTO marketPlaceDTO);
}
