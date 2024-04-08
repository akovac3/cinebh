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
public class FilterParams {
    private String nameLike;
    List<Long> genres;
    List<Long> cinemas;
    List<Long> cities;
    Date startDate;
}
