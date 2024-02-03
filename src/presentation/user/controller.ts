import { Request, Response } from "express";
import { RegisterUserDto, handleError } from "../../domain";
import { UserService } from '../services/user.service';
import { LoginUserDto } from "../../domain";
import { UpdateUserDto } from "../../domain";


export class UserController{

    constructor(
        public readonly AuthService: UserService
    ){}

    registerUser = (req: Request, res: Response) =>{
    
        const [error, registerUserDto] = RegisterUserDto.create(req.body);

        if(error){
            return res.status(400).json({message: error})
        }

        this.AuthService.registerUser(registerUserDto!)
        .then( (data) => res.status(201).json({data}) )
        .catch( (error) => handleError(error, res) )

    }

    loginUser = (req: Request, res: Response) =>{
    
        const [error, loginUserDto] = LoginUserDto.create(req.body);

        if(error){
            return res.status(400).json({message: error})
        }

        this.AuthService.loginUser(loginUserDto!)
        .then( (data) => res.status(200).json(data) )
        .catch( (error) => handleError(error, res) )

    }

    updateUser = (req: Request, res: Response) =>{
        const [ error, updateUserDto ] = UpdateUserDto.create(req.body)

        if(error){
            return res.status(400).json({message: error})
        }

        this.AuthService.updateUser( updateUserDto! )
        .then( (data) => res.status(200).json(data))
        .catch( (error) => handleError(error, res) )

    }

    updateUserPassword = (req: Request, res: Response) =>{
        const { id, password } = req.body
        res.json({id, password})
    }

    uploadPofilePhotoUser = (req: Request, res: Response) =>{
        const { id, photo } = req.body
        this.AuthService.uploadProfilePhotoUser(id, photo)
    }

}