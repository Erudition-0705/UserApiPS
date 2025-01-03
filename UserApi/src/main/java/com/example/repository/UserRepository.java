package com.example.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByRole(String role);

    Optional<User> findBySsn(String ssn);

    List<User> findAllByOrderByAgeAsc();

    List<User> findAllByOrderByAgeDesc();
}

