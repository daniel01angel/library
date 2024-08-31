package com.library.library.service;

import com.library.library.model.Book;

import java.util.List;

public interface IBookService {
    public List<Book> getBook(int id, String title, String isbn);
    public int buyBook(Book book);
    public int updateBook(Book book);
}
