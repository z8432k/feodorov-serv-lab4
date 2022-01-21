package net.unixcomp.suai.lab4.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "rents")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
public class Rent implements Serializable {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "tax")
    private Integer tax;

    @ManyToOne
    @JoinColumn(name="client_id", nullable=false)
    private Client client;

    @OneToOne
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    private Room room;
}
