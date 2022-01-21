package net.unixcomp.suai.lab4.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "rooms")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
public class Room implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "square")
    private Integer square;

    @Column(name = "description")
    private String name;

    @OneToOne(mappedBy = "room")
    @JsonIgnore
    private Rent rent;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Room room = (Room) o;
        return id != null && Objects.equals(id, room.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}