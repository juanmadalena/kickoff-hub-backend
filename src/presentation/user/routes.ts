import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from '../services/user.service';


export class UserRoutes{

    static get routes(): Router{

        const router = Router();
        const authService = new UserService()
        const controller = new UserController(authService)

        router.post('/register', controller.registerUser)
        
        router.post('/login', controller.loginUser)

        router.put('/update', controller.updateUser)

        router.post('/uploadProfilePhoto', controller.uploadPofilePhotoUser)

        return router
    }

}