package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.model.User;
import com.example.service.UserService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/load")
    public ResponseEntity<String> loadUsers() {
        try {
            // Call the external API
            RestTemplate restTemplate = new RestTemplate();
            String url = "https://dummyjson.com/users";
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

            // Parse response to List<User>
            ObjectMapper objectMapper = new ObjectMapper();
            String responseBody = response.getBody();

            if (responseBody == null) {
                return ResponseEntity.badRequest().body("Failed to fetch user data from external API.");
            }

            // Extract users array from response JSON
            List<User> users = objectMapper.readTree(responseBody)
                    .get("users")
                    .traverse(objectMapper)
                    .readValueAs(new TypeReference<List<User>>() {});

            // Save the parsed users to the database
            userService.loadUsers(users);

            return ResponseEntity.ok("Users loaded successfully into the database.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error occurred while loading users: " + e.getMessage());
        }
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/role")
    public List<User> getUsersByRole(@RequestParam("role") String role) {
        return userService.getUsersByRole(role);
    }

//    @GetMapping("/sorted")
//    public List<User> getUsersSortedByAge(@RequestParam boolean ascending) {
//        return userService.getUsersSortedByAge(ascending);
//    }
    
    @GetMapping("/sorted")
    public List<User> getUsersSortedByAge(@RequestParam(name = "ascending") boolean ascending) {
        return userService.getUsersSortedByAge(ascending);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@RequestParam("id") Integer id) {
        return userService.getUserByIdOrSsn(id, null).map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/ssn")
    public ResponseEntity<User> getUserBySsn(@RequestParam("ssn") String ssn) {
        return userService.getUserByIdOrSsn(null, ssn).map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}

