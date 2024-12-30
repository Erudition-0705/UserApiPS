# UserApiPS
Publicis Sapient User API

# Getting Started Backend
# User API Application

This is a Spring Boot-based REST API for managing user data. It supports loading user data from an external API, retrieving users based on various criteria, and sorting users by age.

---

## Features

- Load users from an external API (`https://dummyjson.com/users`) and save them to the database.
- Retrieve all users.
- Retrieve users by role.
- Retrieve users by ID or SSN.
- Sort users by age (ascending or descending).

---

## Technologies Used

- **Java 17**
- **Spring Boot**
- **Spring Data JPA**
- **H2 Database (In-memory)**
- **JUnit 5** for testing
- **Mockito** for mocking
- **Lombok** for boilerplate code reduction
- **RestTemplate** for external API calls
- **ObjectMapper** for JSON parsing

---

## Prerequisites

1. Java 17 or higher installed.
2. Maven installed for dependency management.
3. A code editor or IDE such as IntelliJ IDEA or Eclipse.

---

## Setup Instructions

1. git clone https://github.com/Erudition-0705/UserApiPS
2. cd UserApiPS/UserApi
3. mvn clean install
4. mvn spring-boot:run
5. send the POST call on url http://localhost:8080/api/users/load to load the data in H2 db







