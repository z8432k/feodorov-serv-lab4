package net.unixcomp.suai.lab4.rest;

import net.unixcomp.suai.lab4.dao.RoomsRepository;
import net.unixcomp.suai.lab4.model.Client;
import net.unixcomp.suai.lab4.model.Room;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rooms")
public class RoomsController {
    public final RoomsRepository roomsRepository;

    public RoomsController(RoomsRepository roomsRepository) {
        this.roomsRepository = roomsRepository;
    }


    @GetMapping("/")
    public ResponseEntity<Object> list() {
        return ResponseEntity.ok().body(roomsRepository.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Integer id) {
        try {
            roomsRepository.deleteById(id);

            return ResponseEntity.ok().body(roomsRepository.findAll());
        }
        catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> add(@RequestBody Room room) {
        try {
            return ResponseEntity.ok().body(roomsRepository.save(room));
        }
        catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
