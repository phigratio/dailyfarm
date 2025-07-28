package com.dailyfarm.AnimalService.repositories;

import com.dailyfarm.AnimalService.entitites.AnimalHealth;
import com.dailyfarm.AnimalService.enums.HealthStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AnimalHealthRepository extends JpaRepository<AnimalHealth, String> {

    List<AnimalHealth> findByAnimalAnimalIdOrderByCheckupDateDesc(String animalId);
    
}