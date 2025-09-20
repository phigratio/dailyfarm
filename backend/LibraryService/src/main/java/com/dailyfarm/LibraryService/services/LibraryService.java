package com.dailyfarm.LibraryService.services;

import com.dailyfarm.LibraryService.entities.Library;

import java.util.List;
import java.util.Optional;

public interface LibraryService {

    Library save(Library library);

    Optional<Library> findById(String id);

    List<Library> findAll();

    void deleteById(String id);
}
