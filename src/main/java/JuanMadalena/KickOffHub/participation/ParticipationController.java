package JuanMadalena.KickOffHub.participation;

import JuanMadalena.KickOffHub.match.Match;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "api/participation")
public class ParticipationController {

    private final ParticipationService participationService;

    @Autowired
    public ParticipationController(ParticipationService participationService){
        this.participationService = participationService;
    }
    @GetMapping("")
    public List<Participation> getParticipations(){
        return participationService.getParticipations();
    }

    @GetMapping("/{idMatch}")
    public List<Participation> getParticipationsByMatch(@PathVariable("idMatch") Match idMatch){
        return participationService.getParticipationsByMatch(idMatch);
    }

}
