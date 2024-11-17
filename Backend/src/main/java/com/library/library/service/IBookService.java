package com.library.library.service;

import com.library.library.model.Book;

import java.util.List;
import java.util.Map;

public interface IBookService {
    public List<Book> getBook(int id, String title, String isbn);
    public void buyBooks(Map<Integer, Integer> booksToBuy);
}
