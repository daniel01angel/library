package com.library.library.model;

import lombok.Data;

import java.util.Date;

@Data
public class Review {
    private int ReviewID;
    private int BookID;
    private int UserID;
    private String ReviewText;
    private int Rating;
    private Date ReviewDate;
}