package JuanMadalena.KickOffHub.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table( name = "info_users" )
public class User {

    @Id
    @GeneratedValue(generator = "UUID", strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "uuid DEFAULT uuid_generate_v4()")
    private UUID id;

    @CreationTimestamp
    @Column( name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private java.sql.Timestamp createdAt;

    @UpdateTimestamp
    @Column( name = "updated_at" )
    private java.sql.Timestamp updatedAt;

    @Column( nullable = false, unique = true, length = 100 )
    private String username;

    @Column( nullable = false, unique = true, length = 100)
    private String email;

    @Column( name = "first_name", nullable = false )
    private String firstName;

    @Column( name = "last_name", nullable = false )
    private String lastName;

    @Column( nullable = false )
    private String position;

    @Column( name = "secondary_positions", columnDefinition = "'{}'::character varying(255)[]", length = 1000 )
    private String[] secondaryPositions = new String[0];

    @Column( columnDefinition = "float default 0", precision = 1)
    private Float rating;

    @Column( name = "is_organizer", columnDefinition = "boolean default false" )
    private Boolean is_organizer = false;

    //Photo
    @Column( nullable = true, length = 1000)
    private String photo;

    //Getters

    public UUID getId() {
        return id;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPosition() {
        return position;
    }

    public String[] getSecondaryPositions() {
        return secondaryPositions;
    }

    public Float getRating() {
        return rating;
    }

    public Boolean getIs_organizer() {
        return is_organizer;
    }

    public String getPhoto() {
        return photo;
    }
}
