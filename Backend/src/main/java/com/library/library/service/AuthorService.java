package com.library.library.service;

import com.library.library.model.Author;
import com.library.library.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorService {
    @Autowired
    private AuthorRepository authorRepository;

    public List<Author> getAllAuthors() {
        return authorRepository.getAllAuthors();
    }

    public Author getAuthorById(int id) {
        return authorRepository.getAuthorById(id);
    }

    public List<Author> getAuthorsByName(String name) {
        return authorRepository.getAuthorsByName(name);
    }
}