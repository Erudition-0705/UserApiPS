package com.example.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

// Lombok annotation to generate getters, setters, toString, equals, hashCode
@Data
@Entity
@Table(name = "users")
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {
    @Id
    private Integer id;
    private String firstName;
    private String lastName;
    private Integer age;
    private String gender;
    private String role;
    private String ssn;
    private String email;
    private String phone;
    private String image;

    // Getters and setters
}

