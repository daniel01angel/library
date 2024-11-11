package com.library.library.model;

import lombok.Data;
import java.sql.Date;

@Data
public class Book {
    int BookID;
    String ISBN;
    String title;
    String imageURL;
    int GenreId;
    int AuthorID;
    int PublisherID;
    float Price;
    Date PublicationDate;
    int Stock;
    String Description;
}
