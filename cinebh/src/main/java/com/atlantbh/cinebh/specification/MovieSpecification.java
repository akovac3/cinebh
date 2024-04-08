package com.atlantbh.cinebh.specification;

import com.atlantbh.cinebh.model.*;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class MovieSpecification {

    private MovieSpecification() {}

    public static Specification<Movie> nameLike(String nameLike) {
        return (root, query, builder) -> builder.like(root.get("name"), "%" + nameLike + "%");
    }

    public static Specification<Movie> projectionStartLessThenDate(Date date) {
        if(date==null) date = Date.valueOf(LocalDate.now());
        Date finalDate = date;
        return (root, query, builder) -> builder.lessThanOrEqualTo(root.get("projectionStart"), finalDate);
    }

    public static Specification<Movie> projectionEndGreaterThenDate(Date date) {
        if(date==null) date = Date.valueOf(LocalDate.now());
        Date finalDate = date;
        return (root, query, builder) -> builder.greaterThanOrEqualTo(root.get("projectionEnd"), finalDate);
    }

    public static Specification<Movie> projectionStartGreaterThenDate(Date date) {
        if(date==null) date = Date.valueOf(LocalDate.now());
        Date finalDate = date;
        return (root, query, builder) -> builder.greaterThanOrEqualTo(root.get("projectionStart"), finalDate);
    }

    public static Specification<Movie> hasGenreIn(List<Long> genreIds){
        return (root, query, builder) -> {
            query.distinct(true);
            Root<Genre> genre = query.from(Genre.class);
            Join<Genre,Movie> movieGenres = root.join("genres");
            return builder.and(movieGenres.get("id").in(genreIds));
        };
    }

    public static Specification<Movie> inProjectionTimes(List<String> time) {
        return (root, query, builder) -> {
            Join<Projection,Movie> movieProjections = root.join("projections");
            List<Time> times = new ArrayList<>();
            for(String s : time){
                Time newTime = Time.valueOf(s);
                times.add(newTime);
            }
            return builder.and(movieProjections.get("time").in(times));
        };
    }

    public static Specification<Movie> hasProjectionInCinemas(List<Long> cinemas) {
        return (root, query, builder) -> {
            Join<Projection,Movie> movieProjections = root.join("projections");
            Join<Projection, Venue> projectionVenue = movieProjections.join("venue");
            return builder.and(projectionVenue.get("id").in(cinemas));
        };
    }

    public static Specification<Movie> hasProjectionInCities(List<Long> cities) {
        return (root, query, builder) -> {
            Join<Projection,Movie> movieProjections = root.join("projections");
            Join<Projection, Venue> projectionVenue = movieProjections.join("venue");
            Join<Venue, City> venueCity = projectionVenue.join("city");
            return builder.and(venueCity.get("id").in(cities));
        };
    }
}
