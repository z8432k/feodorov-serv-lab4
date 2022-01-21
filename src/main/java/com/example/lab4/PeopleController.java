package com.example.lab4;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/people")
public class PeopleController {
    public final PeopleRepository peopleRepository;

    public PeopleController(PeopleRepository peopleRepository) {
        this.peopleRepository = peopleRepository;
    }


    @GetMapping("/")
    public ResponseEntity<Object> list() {
        return ResponseEntity.ok().body(peopleRepository.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Integer id) {
        try {
            peopleRepository.deleteById(id);

            return ResponseEntity.ok().body(peopleRepository.findAll());
        }
        catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> add(@RequestBody Person client) {
        try {
            return ResponseEntity.ok().body(peopleRepository.save(client));
        }
        catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
