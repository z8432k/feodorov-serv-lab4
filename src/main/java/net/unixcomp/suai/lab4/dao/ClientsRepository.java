package net.unixcomp.suai.lab4.dao;

import net.unixcomp.suai.lab4.model.Client;
import net.unixcomp.suai.lab4.model.Rent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientsRepository extends JpaRepository<Client, Integer> {
    // Client findClientsByRents(Rent rent);
}
