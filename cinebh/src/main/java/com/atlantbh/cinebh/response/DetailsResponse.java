package com.atlantbh.cinebh.response;

import com.atlantbh.cinebh.model.MovieActor;
import com.atlantbh.cinebh.model.Writer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DetailsResponse {
    private Set<MovieActor> actors;
    private Set<Writer> writers;
}
