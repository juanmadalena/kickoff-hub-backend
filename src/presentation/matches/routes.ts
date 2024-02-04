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
        
        router.get('/:id', controller.getPlayersByMatch)
        router.put('/:id', controller.updateMatch)
        router.delete('/:id', controller.cancelMatch)

        //join match
        router.post('/:id/join', controller.joinMatch)

        return router
    }

}