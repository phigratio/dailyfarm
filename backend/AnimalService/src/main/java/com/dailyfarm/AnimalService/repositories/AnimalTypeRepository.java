package com.dailyfarm.AnimalService.repositories;

import com.dailyfarm.AnimalService.entitites.AnimalType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalTypeRepository extends JpaRepository<AnimalType, String> {
}