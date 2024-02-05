import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { MatchRoutes } from "./matches/routes";
import { UserRoutes } from "./user/router";


export class AppRoutes{

    static get routes(): Router{

        const router = Router();

        router.use('/auth', AuthRoutes.routes)

        router.use('/user', UserRoutes.routes)

        router.use('/matches', MatchRoutes.routes)

        return router
    }

}