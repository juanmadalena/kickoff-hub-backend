package JuanMadalena.KickOffHub.participation;

import JuanMadalena.KickOffHub.match.Match;
import JuanMadalena.KickOffHub.user.User;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.NonNull;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table( name = "rel_players_matches" )
public class Participation {
    @Id
    @GeneratedValue( generator = "UUID", strategy = GenerationType.AUTO )
    @Column( name = "id", updatable = false, nullable = false, columnDefinition = "uuid DEFAULT uuid_generate_v4()")
    private UUID id;

    @Column( name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private java.sql.Timestamp createdAt;

    @Column( name = "updated_at" )
    private java.sql.Timestamp updatedAt;

    @ManyToOne
    @JoinColumn( name = "id_user", referencedColumnName = "id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn( name = "id_match", referencedColumnName = "id", nullable = false)
    private Match match;

    @Column( nullable = false )
    private String position;

    @Column( name = "is_retired", columnDefinition = "boolean default false" )
    private Boolean is_retired = false;

    @Column( name = "retired_at" )
    private java.sql.Timestamp retiredAt;
}
