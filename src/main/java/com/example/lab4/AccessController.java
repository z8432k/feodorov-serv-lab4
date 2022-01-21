package com.example.lab4;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/access")
public class AccessController {
    public final AccessRepository accessRepository;
    public final PeopleRepository peopleRepository;
    public final RoomsRepository roomsRepository;

    public AccessController(AccessRepository accessRepository, PeopleRepository peopleRepository, RoomsRepository roomsRepository) {
        this.accessRepository = accessRepository;
        this.peopleRepository = peopleRepository;
        this.roomsRepository = roomsRepository;
    }

    @GetMapping("/")
    public ResponseEntity<Object> list() {
        return ResponseEntity.ok().body(accessRepository.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Integer id) {
        try {
            accessRepository.deleteById(id);

            return ResponseEntity.ok().body(accessRepository.findAll());
        }
        catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> add(@RequestBody Map<String, Object> payload) {
        try {
            Access grants = new Access();
            grants.setPerson(peopleRepository.getById((Integer) payload.get("client_id")));
            grants.setRoom(roomsRepository.getById((Integer) payload.get("room_id")));
            grants.setDays(Integer.parseInt((String) payload.get("days")));
            accessRepository.save(grants);
            return ResponseEntity.ok().build();
        }
        catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
