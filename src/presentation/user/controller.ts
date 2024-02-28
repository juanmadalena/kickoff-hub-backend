import { Request, Response } from "express"
import { UserService } from "../services/user.service"
import { UpdateUserDto, handleError, RateUserDto } from "../../domain"

export class UserController{
    AuthService: any

    constructor(
        public readonly UserService: UserService
    ){}

    getUserDetailsById = (req: Request, res: Response) =>{
        const { id } = req.params
        console.log(id)
        this.UserService.getUserDetailsById(id)
        .then( (data) => res.status(200).json(data))
        .catch( (error) => handleError(error, res) )
    }
    
    updateUser = (req: Request, res: Response) =>{
        const { idUser, id, ...otherProps } = req.body
        const [ error, updateUserDto ] = UpdateUserDto.create({ id:idUser, ...otherProps })

        if(error) return res.status(400).json({message: error})

        this.UserService.updateUser( updateUserDto! )
        .then( (data) => res.status(200).json(data))
        .catch( (error) => handleError(error, res) )

    }

    updateUserPassword = (req: Request, _res: Response) =>{
        const { idUser, password } = req.body
        this.UserService.updatePasswordUser(idUser, password)
    }

    uploadPofilePhotoUser = (req: Request, res: Response) =>{
        const { idUser } = req.body

        this.UserService.uploadProfilePhotoUser(idUser, req.file?.buffer!)
        .then( (data) => res.status(200).json(data))
        .catch( (error) => handleError(error, res) )
    }

    rateUser = (req: Request, res: Response) =>{
        
        const [error, rateUserDto] = RateUserDto.create(req.body)

        if(error) return res.status(400).json({message: error})

        this.UserService.rateUser(rateUserDto!)
        .then( (data) => res.status(200).json(data))
        .catch( (error) => handleError(error, res) )

    }

}