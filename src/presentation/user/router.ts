import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from '../services/user.service';
import { MulterMiddleware } from "../middleware/multer.middleware";


export class UserRoutes{
    constructor(){}

    static get routes() : Router{
        const router = Router();
        const service = new UserService()
        const controller = new UserController(service)

        //Update user info
        router.put('/', controller.updateUser)
        router.put('/updatePassword', controller.updateUserPassword)
        router.post('/uploadProfilePhoto', [ MulterMiddleware.multer ] , controller.uploadPofilePhotoUser)

        //Rate user
        router.post('/rate', controller.rateUser)

        return router
    }

}