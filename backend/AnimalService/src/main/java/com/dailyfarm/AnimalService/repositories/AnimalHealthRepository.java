package com.dailyfarm.AnimalService.repositories;

import com.dailyfarm.AnimalService.entitites.AnimalHealth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface AnimalHealthRepository extends JpaRepository<AnimalHealth, String> {

    List<AnimalHealth> findByAnimalAnimalIdOrderByCheckupDateDesc(String animalId);

}