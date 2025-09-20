package com.dailyfarm.LibraryService.services.impl;

import com.dailyfarm.LibraryService.entities.Library;
import com.dailyfarm.LibraryService.repositories.LibraryRepository;
import com.dailyfarm.LibraryService.services.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LibraryServiceImpl implements LibraryService {

    private final LibraryRepository libraryRepository;

    @Autowired
    public LibraryServiceImpl(LibraryRepository libraryRepository) {
        this.libraryRepository = libraryRepository;
    }

    @Override
    public Library save(Library library) {
        return libraryRepository.save(library);
    }

    @Override
    public Optional<Library> findById(String id) {
        return libraryRepository.findById(id);
    }

    @Override
    public List<Library> findAll() {
        return libraryRepository.findAll();
    }

    @Override
    public void deleteById(String id) {
        libraryRepository.deleteById(id);
    }
}
