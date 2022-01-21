package net.unixcomp.suai.lab4.dao;

import net.unixcomp.suai.lab4.data.Access;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccessRepository extends JpaRepository<Access, Integer> {
    // Rent findRentsByClient(Client client);
}
