package com.example.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.example.model.User;
import com.example.repository.UserRepository;

class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    UserServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLoadUsers() {
        List<User> users = Arrays.asList(
            new User()
        );

        userService.loadUsers(users);
        verify(userRepository, times(1)).saveAll(users);
    }

    @Test
    void testGetAllUsers() {
        User user = new User();
        user.setId(1);
        user.setFirstName("John");

        when(userRepository.findAll()).thenReturn(Arrays.asList(user));

        List<User> users = userService.getAllUsers();

        assertEquals(1, users.size());
        assertEquals("John", users.get(0).getFirstName());
    }

    @Test
    void testGetUsersByRole() {
        User user = new User();
        user.setRole("Admin");

        when(userRepository.findByRole("Admin")).thenReturn(Arrays.asList(user));

        List<User> users = userService.getUsersByRole("Admin");

        assertEquals(1, users.size());
        assertEquals("Admin", users.get(0).getRole());
    }

    @Test
    void testGetUsersSortedByAgeAscending() {
        User user1 = new User();
        user1.setId(1);
        user1.setAge(25);

        User user2 = new User();
        user2.setId(2);
        user2.setAge(30);

        when(userRepository.findAllByOrderByAgeAsc()).thenReturn(Arrays.asList(user1, user2));

        List<User> users = userService.getUsersSortedByAge(true);

        assertEquals(25, users.get(0).getAge());
        assertEquals(30, users.get(1).getAge());
    }

    @Test
    void testGetUsersSortedByAgeDescending() {
        User user1 = new User();
        user1.setId(1);
        user1.setAge(30);

        User user2 = new User();
        user2.setId(2);
        user2.setAge(25);

        when(userRepository.findAllByOrderByAgeDesc()).thenReturn(Arrays.asList(user1, user2));

        List<User> users = userService.getUsersSortedByAge(false);

        assertEquals(30, users.get(0).getAge());
        assertEquals(25, users.get(1).getAge());
    }

    @Test
    void testGetUserById() {
        User user = new User();
        user.setId(3);

        when(userRepository.findById(3)).thenReturn(Optional.of(user));

        Optional<User> result = userService.getUserByIdOrSsn(3, null);

        assertTrue(result.isPresent());
        assertEquals(3, result.get().getId());
    }

    @Test
    void testGetUserBySsn() {
        User user = new User();
        user.setSsn("123-45-6789");

        when(userRepository.findBySsn("123-45-6789")).thenReturn(Optional.of(user));

        Optional<User> result = userService.getUserByIdOrSsn(null, "123-45-6789");

        assertTrue(result.isPresent());
        assertEquals("123-45-6789", result.get().getSsn());
    }
}
