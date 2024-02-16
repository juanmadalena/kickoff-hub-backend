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
        router.get('/:id', controller.getMatch)
        router.post('/', controller.createMatch)
        router.put('/', controller.updateMatch)
        router.delete('/', controller.cancelMatch)
        
        router.get('/players/:id', controller.getPlayersByMatch)

        router.post('/join', controller.joinMatch)

        return router
    }

}