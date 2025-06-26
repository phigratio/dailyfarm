package com.dailyfarm.Farm.FarmService.repositories;

import com.dailyfarm.Farm.FarmService.entities.Farm;
import com.dailyfarm.Farm.FarmService.enums.FarmType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FarmRepository extends JpaRepository<Farm,String> {
    Optional<Farm> findByFarmId(String farmId);
    List<Farm> findByOwnerIdAndIsActiveTrue(String ownerId);

    List<Farm> findByDivisionAndIsActiveTrue(String division);

    List<Farm> findByDivisionAndDistrictAndIsActiveTrue(String division, String district);

    List<Farm> findByFarmTypeAndIsActiveTrue(FarmType farmType);


}
