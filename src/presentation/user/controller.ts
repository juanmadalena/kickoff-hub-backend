import { Request, Response } from "express"
import { UserService } from "../services/user.service"
import { UpdateUserDto, handleError, RateUserDto } from "../../domain"

export class UserController{
    AuthService: any

    constructor(
        public readonly UserService: UserService
    ){}
    
    updateUser = (req: Request, res: Response) =>{
        const [ error, updateUserDto ] = UpdateUserDto.create(req.body)

        if(error) return res.status(400).json({message: error})

        this.UserService.updateUser( updateUserDto! )
        .then( (data) => res.status(200).json(data))
        .catch( (error) => handleError(error, res) )

    }

    updateUserPassword = (req: Request, _res: Response) =>{
        const { id, password } = req.body
        this.UserService.updatePasswordUser(id, password)
    }

    uploadPofilePhotoUser = (req: Request, _res: Response) =>{
        const { id, photo } = req.body
        this.UserService.uploadProfilePhotoUser(id, photo)
    }

    rateUser = (req: Request, res: Response) =>{
        
        const [error, rateUserDto] = RateUserDto.create(req.body)

        if(error) return res.status(400).json({message: error})

        this.UserService.rateUser(rateUserDto!)
        .then( (data) => res.status(200).json(data))
        .catch( (error) => handleError(error, res) )

    }

}