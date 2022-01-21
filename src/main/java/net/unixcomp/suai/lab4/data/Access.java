package net.unixcomp.suai.lab4.data;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "access")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
public class Access implements Serializable {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "days")
    private Integer days;

    @ManyToOne
    @JoinColumn(name="person_id", nullable=false)
    private Person person;

    @ManyToOne
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    private Room room;
}
