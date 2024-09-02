package com.library.library.repository;

import com.library.library.model.Book;

import java.util.List;

public interface IBookRepository {
    public List<Book> getBook(int id, String title, String isbn);
    public int buyBook(int bookId, int bookQuantity);
    public int updateBook(Book book);
}
