import { Router } from "express";
import { UserRoutes } from "./user/routes";
import { MatchRoutes } from "./matches/routes";


export class AppRoutes{

    static get routes(): Router{

        const router = Router();

        router.use('/auth', UserRoutes.routes)

        router.use('/matches', MatchRoutes.routes)

        return router
    }

}