import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from '../services/user.service';


export class UserRoutes{
    constructor(){}

    static get routes() : Router{
        const router = Router();
        const service = new UserService()
        const controller = new UserController(service)

        //Update user info
        router.put('/:id', controller.updateUser)
        router.put('/:id/updatePassword', controller.updateUserPassword)
        router.post('/:id/uploadProfilePhoto', controller.uploadPofilePhotoUser)

        //Rate user
        router.post('/:id/rate', controller.rateUser)

        return router
    }

}