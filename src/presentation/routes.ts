import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { MatchRoutes } from "./matches/routes";


export class AppRoutes{

    static get routes(): Router{

        const router = Router();

        router.use('/auth', AuthRoutes.routes)

        router.use('/matches', MatchRoutes.routes)

        return router
    }

}