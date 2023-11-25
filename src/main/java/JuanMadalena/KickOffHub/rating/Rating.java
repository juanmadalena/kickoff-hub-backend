package JuanMadalena.KickOffHub.rating;

import JuanMadalena.KickOffHub.match.Match;
import JuanMadalena.KickOffHub.user.User;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.UUID;

@Entity
@Table( name = "info_ratings")
public class Rating {

    @Id
    @Column( name = "id" )
    @GeneratedValue( generator = "UUID", strategy = GenerationType.AUTO )
    private UUID id;

    @CreationTimestamp
    @Column( name = "created_at", nullable = false)
    private java.sql.Timestamp createdAt;

    @ManyToOne
    @JoinColumn( name = "user_rated_by", referencedColumnName = "id", nullable = false)
    private User user_rated_by;

    @ManyToOne
    @JoinColumn( name = "user_rated", referencedColumnName = "id", nullable = false)
    private User user_rated;

    @Column( name = "rating", nullable = false, precision = 2)
    private double rating;

    @ManyToOne
    @JoinColumn( name = "match", referencedColumnName = "id", nullable = false)
    private Match match;
}
