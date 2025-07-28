package com.dailyfarm.AnimalService.repositories;

import com.dailyfarm.AnimalService.entitites.SymbioticRelationship;
import com.dailyfarm.AnimalService.enums.SymbioticType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SymbioticRelationshipRepository extends JpaRepository<SymbioticRelationship, String> {

    List<SymbioticRelationship> findByFarmIdAndIsActiveTrue(String farmId);
    List<SymbioticRelationship> findByTypeAndIsActiveTrue(SymbioticType type);
    List<SymbioticRelationship> findByEcosystemIdAndIsActiveTrue(String ecosystemId);

    @Query("SELECT sr FROM SymbioticRelationship sr " +
            "JOIN sr.animals a WHERE " +
            "a.animalId = :animalId AND sr.isActive = true")
    List<SymbioticRelationship> findByAnimalsAnimalIdAndIsActiveTrue(@Param("animalId") String animalId);

    @Query("SELECT sr FROM SymbioticRelationship sr WHERE " +
            "sr.farmId = :farmId " +
            "AND sr.isSuccessful = true " +
            "AND sr.isActive = true")
    List<SymbioticRelationship> findSuccessfulRelationships(@Param("farmId") String farmId);

    @Query("SELECT sr FROM SymbioticRelationship sr WHERE " +
            "sr.farmId = :farmId " +
            "AND sr.roiPercentage > :minRoi " +
            "AND sr.isActive = true")
    List<SymbioticRelationship> findProfitableRelationships(@Param("farmId") String farmId,
                                                            @Param("minRoi") Double minRoi);
}