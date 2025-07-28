package com.dailyfarm.AnimalService.repositories;


import com.dailyfarm.AnimalService.entitites.AnimalProductivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AnimalProductivityRepository extends JpaRepository<AnimalProductivity, String> {

    List<AnimalProductivity> findByAnimalAnimalIdOrderByRecordDateDesc(String animalId);
    List<AnimalProductivity> findByAnimalAnimalIdAndRecordDateBetween(String animalId,
                                                                      LocalDate startDate,
                                                                      LocalDate endDate);
    List<AnimalProductivity> findByProductType(String productType);

    @Query("SELECT ap FROM AnimalProductivity ap " +
            "JOIN ap.animal a WHERE " +
            "a.farmId = :farmId " +
            "AND ap.recordDate BETWEEN :startDate AND :endDate")
    List<AnimalProductivity> findFarmProductivityRecords(@Param("farmId") String farmId,
                                                         @Param("startDate") LocalDate startDate,
                                                         @Param("endDate") LocalDate endDate);

    @Query("SELECT SUM(ap.quantity) FROM AnimalProductivity ap " +
            "WHERE ap.animal.animalId = :animalId " +
            "AND ap.recordDate BETWEEN :startDate AND :endDate")
    Double getTotalProductivity(@Param("animalId") String animalId,
                                @Param("startDate") LocalDate startDate,
                                @Param("endDate") LocalDate endDate);

    @Query("SELECT AVG(ap.feedEfficiency) FROM AnimalProductivity ap " +
            "WHERE ap.animal.animalId = :animalId " +
            "AND ap.recordDate BETWEEN :startDate AND :endDate")
    Double getAverageFeedEfficiency(@Param("animalId") String animalId,
                                    @Param("startDate") LocalDate startDate,
                                    @Param("endDate") LocalDate endDate);
}