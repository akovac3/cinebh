package com.atlantbh.cinebh.repository;

import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.model.Projection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.Set;

public interface ProjectionRepository extends JpaRepository<Projection, Long>, JpaSpecificationExecutor<Projection> {
    @Query("SELECT DISTINCT time FROM Projection ORDER BY time ASC ")
    List<Time> getTimes();
}
