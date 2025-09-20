package com.example.marketplace.services;

import com.example.marketplace.dtos.MarketPlaceDTO;

import java.util.List;
import java.util.Optional;

public interface MarketPlaceService {

    MarketPlaceDTO save(MarketPlaceDTO marketPlaceDTO);

    Optional<MarketPlaceDTO> findById(Long id);

    List<MarketPlaceDTO> findAll();

    MarketPlaceDTO update(Long id, MarketPlaceDTO marketPlaceDTO);

    void deleteById(Long id);
    List<MarketPlaceDTO> findByUserId(String userId);

}
