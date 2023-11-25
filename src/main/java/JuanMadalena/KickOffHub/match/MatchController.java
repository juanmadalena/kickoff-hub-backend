package JuanMadalena.KickOffHub.match;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "api/match")
public class MatchController {

    private final MatchService matchService;

    @Autowired
    public MatchController(MatchService matchService){
        this.matchService = matchService;
    }

    @GetMapping("")
    public List<Match> getMatches(){
        return matchService.getMatches();
    }

    @GetMapping("/{id}")
    public Match getMatchById(@PathVariable("id") UUID id){
        return matchService.getMatchById(id);
    }

    @PostMapping("")
    public void registerNewMatch(@RequestBody Match match){
        matchService.addNewMatch(match);
    }

}
