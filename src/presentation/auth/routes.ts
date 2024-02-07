import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from '../services/auth.service';
import { AuthMiddleware } from "../middleware/auth.middleware";


export class AuthRoutes{

    static get routes(): Router{

        const router = Router();
        const authService = new AuthService()
        const controller = new AuthController(authService)

        router.post('/register', controller.registerUser)
        router.post('/login', controller.loginUser)
        router.get('/validateToken', [ AuthMiddleware.validateToken ], controller.validateToken)

        return router
    }

}