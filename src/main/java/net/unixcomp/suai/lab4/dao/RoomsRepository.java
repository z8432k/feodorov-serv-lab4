package net.unixcomp.suai.lab4.dao;

import net.unixcomp.suai.lab4.data.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomsRepository extends JpaRepository<Room, Integer> {

}
