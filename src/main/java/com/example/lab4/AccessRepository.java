package com.example.lab4;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AccessRepository extends JpaRepository<Access, Integer> {
    // Rent findRentsByClient(Client client);
}
