package net.unixcomp.suai.lab4.dao;

import net.unixcomp.suai.lab4.model.Client;
import net.unixcomp.suai.lab4.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomsRepository extends JpaRepository<Room, Integer> {

}
