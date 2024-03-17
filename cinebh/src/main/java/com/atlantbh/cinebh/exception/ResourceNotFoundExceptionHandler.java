package com.atlantbh.cinebh.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.ZoneId;
import java.time.ZonedDateTime;

@ControllerAdvice
public class ResourceNotFoundExceptionHandler {

    @ExceptionHandler(value = {com.atlantbh.cinebh.exception.ResourceNotFoundException.class})
    public ResponseEntity<Object> handleResourceNotFoundException(com.atlantbh.cinebh.exception.ResourceNotFoundException e){
        com.atlantbh.cinebh.exception.Exception exception = new com.atlantbh.cinebh.exception.Exception(
                e.getMessage(),
                HttpStatus.BAD_REQUEST,
                ZonedDateTime.now(ZoneId.of("Z"))
        );
        return new ResponseEntity<>(exception, HttpStatus.BAD_REQUEST);
    }
}
