package com.atlantbh.cinebh.specification;

import com.atlantbh.cinebh.model.City;
import com.atlantbh.cinebh.model.Venue;
import org.springframework.data.jpa.domain.Specification;

public class VenueSpecification {
    public static Specification<Venue> nameLike(String contains) {
        return (root, query, builder) -> {
            query.distinct(true);
            return builder.like(builder.lower(root.get("name")), "%" + contains.toLowerCase() + "%");
        };
    }

    public static Specification<Venue> hasProjectionInCity(City city) {
        return (root, query, builder) -> {
            query.distinct(true);
            return builder.and(root.get("city").in(city));
        };
    }
}
