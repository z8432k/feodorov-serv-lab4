package net.unixcomp.suai.lab4.dao;

import net.unixcomp.suai.lab4.data.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PeopleRepository extends JpaRepository<Person, Integer> {
    // Client findClientsByRents(Rent rent);
}
