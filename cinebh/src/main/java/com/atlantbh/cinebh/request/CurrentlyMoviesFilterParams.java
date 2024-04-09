package com.atlantbh.cinebh.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CurrentlyMoviesFilterParams extends MovieFilterParams {
    private List<String> times;
}
