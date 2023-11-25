package JuanMadalena.KickOffHub.match;

import JuanMadalena.KickOffHub.participation.Participation;
import JuanMadalena.KickOffHub.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table( name = "info_matches" )
public class Match {
    @Id
    @GeneratedValue( generator = "UUID", strategy = GenerationType.AUTO )
    @Column( name = "id", updatable = false, nullable = false, columnDefinition = "uuid DEFAULT uuid_generate_v4()")
    private UUID id;

    @Column( name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private java.sql.Timestamp createdAt;

    @Column( name = "updated_at" )
    private java.sql.Timestamp updatedAt;

    @ManyToOne
    @JoinColumn(name = "id_organizer", referencedColumnName = "id")
    private User organizer;

    @Column( nullable = false)
    private String location;

    @Column( nullable = false)
    private double latitude;

    @Column( nullable = false)
    private double longitude;

    @Column( nullable = false)
    private java.sql.Date date;

    @Column( nullable = false)
    private java.sql.Time time;

    @Column( nullable = false, columnDefinition = "time default '01:00:00'")
    private java.sql.Time duration = java.sql.Time.valueOf("01:00:00");

    @Column( nullable = false, columnDefinition = "float default 0", precision = 2)
    private Float price;

    @Column( nullable = true, length = 1000)
    private String description;

    @Column( name = "num_players", nullable = false, columnDefinition = "integer default 0")
    private Integer numPlayers = 0;

    @Column( name = "max_players", nullable = false, columnDefinition = "integer default 14")
    private Integer maxPlayers;

    @Column( name = "min_players", nullable = false, columnDefinition = "integer default 12")
    private Integer minPlayers;

    @Column( name = "is_private", nullable = false, columnDefinition = "boolean default false")
    private Boolean isPrivate = false;

    @Column( name = "is_cancelled", nullable = false, columnDefinition = "boolean default false")
    private Boolean isCancelled = false;

}
