package com.dailyfarm.AnimalService.repositories;

import com.dailyfarm.AnimalService.entitites.AnimalBreed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalBreedRepository extends JpaRepository<AnimalBreed, String> {
}