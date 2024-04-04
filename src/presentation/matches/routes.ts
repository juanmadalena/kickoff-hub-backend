import { Router } from "express";
import { MatchController } from "./controller";
import { MatchService } from '../services/match.service';


export class MatchRoutes{
    constructor(){}

    static get routes() : Router{
        const router = Router();
        const service = new MatchService()
        const controller = new MatchController(service)

        
        router.get('/', controller.getMatches)
        router.post('/', controller.createMatch)
        router.put('/', controller.updateMatch)
        router.delete('/', controller.cancelMatch)
        
        router.get('/played', controller.getMatchesPlayed)
        router.get('/organized', controller.getMatchesOrganized)
        
        router.get('/:id', controller.getMatch)

        router.get('/:id/players', controller.getPlayersByMatch)
        router.get('/:id/playersToRate', controller.getPlayersToRate)
        router.post('/:id/ratePlayer', controller.rateUser)

        router.post('/:id/join', controller.joinMatch)
        router.post('/:id/leave', controller.leaveMatch)


        return router
    }

}