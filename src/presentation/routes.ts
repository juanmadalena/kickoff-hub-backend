import { Router } from "express";
import { UserRoutes } from "./user/routes";


export class AppRoutes{

    static get routes(): Router{

        const router = Router();

        router.use('/auth', UserRoutes.routes)

        return router
    }

}