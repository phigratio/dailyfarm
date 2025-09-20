package com.dailyfarm.LibraryService.repositories;

import com.dailyfarm.LibraryService.entities.Library;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LibraryRepository extends JpaRepository<Library, String> {
    // You can add custom query methods here if needed
}
