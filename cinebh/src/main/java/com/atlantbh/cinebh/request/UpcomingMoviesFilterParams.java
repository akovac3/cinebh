package com.atlantbh.cinebh.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@AllArgsConstructor
@Getter
@Setter
public class UpcomingMoviesFilterParams extends MovieFilterParams {
    private Date endDate;
}
