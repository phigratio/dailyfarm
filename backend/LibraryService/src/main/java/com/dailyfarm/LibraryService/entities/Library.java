package com.dailyfarm.LibraryService.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "library_items")
public class Library {

    @Id
    private String id;

    @Column(nullable = false)
    private String link;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String title;

    // Constructors
    public Library() {}

    public Library(String id, String link, String category, String title) {
        this.id = id;
        this.link = link;
        this.category = category;
        this.title = title;
    }

    // Getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
