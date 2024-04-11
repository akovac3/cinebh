package com.atlantbh.cinebh.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MovieFilterParams {
    private String nameLike;
    List<Long> genres;
    Long venue = 0L;
    Long city = 0L;
    Date startDate;
}
