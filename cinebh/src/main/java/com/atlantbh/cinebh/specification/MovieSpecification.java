package com.atlantbh.cinebh.specification;

import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.model.Genre;
import com.atlantbh.cinebh.model.Projection;
import com.atlantbh.cinebh.model.Venue;
import com.atlantbh.cinebh.model.City;
import com.atlantbh.cinebh.model.Status;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.util.Set;

public class MovieSpecification {
    public static Specification<Movie> nameLike(String contains) {
        return (root, query, builder) -> {
            query.distinct(true);
            return builder.like(builder.lower(root.get("name")), "%" + contains.toLowerCase() + "%");
        };
    }

    public static Specification<Movie> hasStatus(Status status) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("status"), status);
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
        date1 = Date.valueOf(LocalDate.now().plusDays(10));
        Date finalDate1 = date1;
        if(date2 == null) return (root, query, builder) -> builder.greaterThanOrEqualTo(root.get("projectionStart"), finalDate1);
        else {
            return (root, query, criteriaBuilder) -> criteriaBuilder.between(root.get("projectionStart"), finalDate1, date2);
        }
    }

    public static Specification<Movie> hasSimilarGenres(Long id, Set<Genre> genres) {
        return (root, query, builder) -> {
            query.distinct(true);
            Join<Movie, Genre> genreJoin = root.join("genres");
            return builder.and(
                    genreJoin.in(genres),
                    builder.notEqual(root.get("movieId"), id)
            );
        };
    }

    public static Specification<Movie> hasGenre(Genre genre) {
        return (root, query, builder) -> {
            query.distinct(true);
            Join<Genre, Movie> movieGenres = root.join("genres");
            return builder.and(movieGenres.in(genre));
        };
    }

    public static Specification<Movie> hasProjectionTime(String time) {
        return (root, query, builder) -> {
            query.distinct(true);
            Join<Projection, Movie> movieProjections = root.join("projections");
            return builder.and(movieProjections.get("time").in(Time.valueOf(time)));
        };
    }

    public static Specification<Movie> hasProjectionInVenue(Venue venue) {
        return (root, query, builder) -> {
            query.distinct(true);
            return builder.and(root.get("projections").get("venue").in(venue));
        };
    }

    public static Specification<Movie> hasProjectionInCity(City city) {
        return (root, query, builder) -> {
            query.distinct(true);
            return builder.and(root.get("projections").get("venue").get("city").in(city));
        };
    }
}
