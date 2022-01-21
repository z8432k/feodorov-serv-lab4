package com.example.lab4;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PeopleRepository extends JpaRepository<Person, Integer> {
    // Client findClientsByRents(Rent rent);
}
