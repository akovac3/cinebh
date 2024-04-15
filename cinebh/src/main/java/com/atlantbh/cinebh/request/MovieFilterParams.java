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
    private List<Long> genres;
    private Long venue = 0L;
    private Long city = 0L;
    private Date startDate;
}
