package ChurchApp.Primesniper;


import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "primesnipertsdb")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Sniper implements Serializable {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    private String username;

    private String msisdn;

    private Gender gender;

    private LocalDate birthday;

    private String email;

    private String password;

    public Boolean hasCash =false;
}
