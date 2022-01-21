package net.unixcomp.suai.lab4.rest;

import net.unixcomp.suai.lab4.dao.ClientsRepository;
import net.unixcomp.suai.lab4.dao.RentsRepository;
import net.unixcomp.suai.lab4.dao.RoomsRepository;
import net.unixcomp.suai.lab4.model.Rent;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/rents")
public class RentsController {
    public final RentsRepository rentsRepository;
    public final ClientsRepository clientsRepository;
    public final RoomsRepository roomsRepository;

    public RentsController(RentsRepository rentsRepository, ClientsRepository clientsRepository, RoomsRepository roomsRepository) {
        this.rentsRepository = rentsRepository;
        this.clientsRepository = clientsRepository;
        this.roomsRepository = roomsRepository;
    }

    @GetMapping("/")
    public ResponseEntity<Object> list() {
        return ResponseEntity.ok().body(rentsRepository.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Integer id) {
        try {
            rentsRepository.deleteById(id);

            return ResponseEntity.ok().body(rentsRepository.findAll());
        }
        catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> add(@RequestBody Map<String, Object> payload) {
        try {
            Rent rent = new Rent();
            rent.setClient(clientsRepository.getById((Integer) payload.get("client_id")));
            rent.setRoom(roomsRepository.getById((Integer) payload.get("room_id")));
            rent.setTax(Integer.parseInt((String) payload.get("tax")));
            rentsRepository.save(rent);
            return ResponseEntity.ok().build();
        }
        catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
