package com.example.marketplace.Repositories;

import com.example.marketplace.entities.MarketPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarketPlaceRepositories extends JpaRepository<MarketPlace, Long> {
    List<MarketPlace> findByUserId(String userId);
}
