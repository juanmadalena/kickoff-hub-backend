package JuanMadalena.KickOffHub.participation;

import JuanMadalena.KickOffHub.match.Match;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ParticipationService {

    private final ParticipationRepository participationRepository;

    @Autowired
    public ParticipationService(ParticipationRepository participationRepository){
        this.participationRepository = participationRepository;
    }

    public void addNewParticipation(Participation participation){
        participationRepository.save(participation);
    }

    public void deleteParticipation(Participation participation){
        participationRepository.delete(participation);
    }

    public Participation getParticipationById(UUID id){
        return participationRepository.findById(id).orElseThrow(() -> new IllegalStateException("Participation with id " + id + " does not exist"));
    }

    public List<Participation> getParticipations(){
        return participationRepository.findAll();
    }

    public List<Participation> getParticipationsByMatch(Match idMatch){
        return participationRepository.findByMatch(idMatch);
    }
}
