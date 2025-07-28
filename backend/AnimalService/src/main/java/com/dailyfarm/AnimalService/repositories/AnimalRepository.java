package com.dailyfarm.AnimalService.repositories;

import com.dailyfarm.AnimalService.entitites.Animal;
import com.dailyfarm.AnimalService.enums.AnimalCategory;
import com.dailyfarm.AnimalService.enums.AnimalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface AnimalRepository extends JpaRepository<Animal, String> {

    // Basic queries
    List<Animal> findByFarmIdAndIsActiveTrue(String farmId);
    List<Animal> findByOwnerIdAndIsActiveTrue(String ownerId);
    List<Animal> findByCategoryAndIsActiveTrue(AnimalCategory category);
    List<Animal> findByStatusAndIsActiveTrue(AnimalStatus status);
    List<Animal> findByDivisionAndDistrictAndIsActiveTrue(String division, String district);



}