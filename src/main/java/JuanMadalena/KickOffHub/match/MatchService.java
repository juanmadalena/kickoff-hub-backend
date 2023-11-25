package JuanMadalena.KickOffHub.match;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MatchService {

    private final MatchRepository matchRepository;

    @Autowired
    public MatchService(MatchRepository matchRepository){
        this.matchRepository = matchRepository;
    }

    public List<Match> getMatches(){
        return matchRepository.findAll();
    }

    public Match getMatchById(UUID id){

        return matchRepository.findById(id).orElseThrow(() -> new IllegalStateException("Match with id " + id + " does not exist"));
    }

    public void addNewMatch(Match match){
        matchRepository.save(match);
    }

}
