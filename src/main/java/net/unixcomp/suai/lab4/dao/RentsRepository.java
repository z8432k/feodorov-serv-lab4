package net.unixcomp.suai.lab4.dao;

import net.unixcomp.suai.lab4.model.Client;
import net.unixcomp.suai.lab4.model.Rent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RentsRepository extends JpaRepository<Rent, Integer> {
    // Rent findRentsByClient(Client client);
}
