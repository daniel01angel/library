package com.library.library.repositoy;

import com.library.library.model.Book;

import java.util.List;

public interface IBookRepository {
    public List<Book> getBook(Book book);
    public int buyBook(Book book);
    public int updateBook(Book book);
}
