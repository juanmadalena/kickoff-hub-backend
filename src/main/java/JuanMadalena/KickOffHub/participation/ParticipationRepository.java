package JuanMadalena.KickOffHub.participation;

import JuanMadalena.KickOffHub.match.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface ParticipationRepository extends JpaRepository<Participation, UUID> {
    List<Participation> findByMatch(Match idMatch);
}
