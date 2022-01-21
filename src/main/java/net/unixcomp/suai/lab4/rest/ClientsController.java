package net.unixcomp.suai.lab4.rest;

import net.unixcomp.suai.lab4.dao.ClientsRepository;
import net.unixcomp.suai.lab4.model.Client;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/clients")
public class ClientsController {
    public final ClientsRepository clientsRepository;

    public ClientsController(ClientsRepository clientsRepository) {
        this.clientsRepository = clientsRepository;
    }

    @GetMapping("/")
    public ResponseEntity<Object> list() {
        return ResponseEntity.ok().body(clientsRepository.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Integer id) {
        try {
            clientsRepository.deleteById(id);

            return ResponseEntity.ok().body(clientsRepository.findAll());
        }
        catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> add(@RequestBody Client client) {
        try {
            return ResponseEntity.ok().body(clientsRepository.save(client));
        }
        catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
