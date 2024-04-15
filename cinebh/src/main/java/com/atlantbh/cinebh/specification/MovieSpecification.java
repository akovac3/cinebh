package com.atlantbh.cinebh.specification;

import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.model.Genre;
import com.atlantbh.cinebh.model.Projection;
import com.atlantbh.cinebh.model.Venue;
import com.atlantbh.cinebh.model.City;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class MovieSpecification {
    public static Specification<Movie> nameLike(String nameLike) {
        return (root, query, builder) -> builder.like(builder.lower(root.get("name")), "%" + nameLike.toLowerCase() + "%");
    }

    public static Specification<Movie> projectionStartLessThenDate(Date date) {
        if (date == null) date = Date.valueOf(LocalDate.now());
        Date finalDate = date;
        return (root, query, builder) -> builder.lessThanOrEqualTo(root.get("projectionStart"), finalDate);
    }

    public static Specification<Movie> projectionEndGreaterThenDate(Date date) {
        if (date == null) date = Date.valueOf(LocalDate.now());
        Date finalDate = date;
        return (root, query, builder) -> builder.greaterThanOrEqualTo(root.get("projectionEnd"), finalDate);
    }

    public static Specification<Movie> projectionBetweenDates(Date date1, Date date2){
        if (date1 == null) date1 = Date.valueOf(LocalDate.now().plusDays(10));
        Date finalDate1 = date1;
        if(date2 == null) return (root, query, builder) -> builder.greaterThanOrEqualTo(root.get("projectionStart"), finalDate1);
        else {
            return (root, query, criteriaBuilder) -> criteriaBuilder.between(root.get("projectionStart"), finalDate1, date2);
        }

    }

    public static Specification<Movie> projectionStartGreaterThenDate(Date date) {
        if (date == null) date = Date.valueOf(LocalDate.now().plusDays(10));
        Date finalDate = date;
        return (root, query, builder) -> builder.greaterThanOrEqualTo(root.get("projectionStart"), finalDate);
    }

    public static Specification<Movie> hasGenreIn(List<Long> genreIds) {
        return (root, query, builder) -> {
            query.distinct(true);
            Join<Genre, Movie> movieGenres = root.join("genres");
            return builder.and(movieGenres.get("id").in(genreIds));
        };
    }

    public static Specification<Movie> inProjectionTimes(List<String> time) {
        return (root, query, builder) -> {
            query.distinct(true);
            Join<Projection, Movie> movieProjections = root.join("projections");
            List<Time> times = new ArrayList<>();
            for (String s : time) {
                Time newTime = Time.valueOf(s);
                times.add(newTime);
            }
            return builder.and(movieProjections.get("time").in(times));
        };
    }

    public static Specification<Movie> hasProjectionInCinemas(Venue venue) {
        return (root, query, builder) -> {
            query.distinct(true);
            return builder.and(root.get("projections").get("venue").in(venue));
        };
    }

    public static Specification<Movie> hasProjectionInCities(City city) {
        return (root, query, builder) -> {
            query.distinct(true);
            return builder.and(root.get("projections").get("venue").get("city").in(city));
        };
    }
}
