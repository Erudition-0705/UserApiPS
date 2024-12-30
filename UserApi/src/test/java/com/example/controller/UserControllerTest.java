package com.example.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.example.model.User;
import com.example.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void testLoadUsers() throws Exception {
    	doNothing().when(userService).loadUsers(anyList());

        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/load")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("Users loaded successfully into the database."));
    }

    @Test
    void testGetAllUsers() throws Exception {
        User user = new User();
        user.setId(1);
        user.setFirstName("John");
        user.setLastName("Doe");

        when(userService.getAllUsers()).thenReturn(Arrays.asList(user));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/users")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].firstName").value("John"));
    }

    @Test
    void testGetUsersByRole() throws Exception {
        User user = new User();
        user.setId(1);
        user.setRole("Admin");

        when(userService.getUsersByRole("Admin")).thenReturn(Arrays.asList(user));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/role?role=Admin")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].role").value("Admin"));
    }

    @Test
    void testGetUsersSortedByAge() throws Exception {
        User user = new User();
        user.setId(1);
        user.setFirstName("John");
        user.setAge(25);

        when(userService.getUsersSortedByAge(true)).thenReturn(Arrays.asList(user));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/sorted?ascending=true")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].age").value(25));
    }

    @Test
    void testGetUserById() throws Exception {
        User user = new User();
        user.setId(3);
        user.setFirstName("Jane");

        when(userService.getUserByIdOrSsn(3, null)).thenReturn(Optional.of(user));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/3?id=3")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("Jane"));
    }

    @Test
    void testGetUserBySsn() throws Exception {
        User user = new User();
        user.setSsn("123-45-6789");
        user.setFirstName("Mike");

        when(userService.getUserByIdOrSsn(null, "123-45-6789")).thenReturn(Optional.of(user));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/ssn?ssn=123-45-6789")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("Mike"));
    }
}
