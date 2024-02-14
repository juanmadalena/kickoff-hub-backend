import { Request, Response } from "express";
import { RegisterUserDto, handleError, LoginUserDto } from "../../domain";
import { AuthService } from '../services/auth.service';


export class AuthController{

    constructor(
        public readonly AuthService: AuthService
    ){}

    registerUser = (req: Request, res: Response) =>{
    
        const [error, registerUserDto] = RegisterUserDto.create(req.body);

        if(error){
            return res.status(400).json({message: error.message, input: error.input})
        }

        this.AuthService.registerUser(registerUserDto!)
        .then( (data) => res.status(201).json(data) )
        .catch( (error) => handleError(error, res) )

    }

    loginUser = (req: Request, res: Response) =>{
    
        const [error, loginUserDto] = LoginUserDto.create(req.body);

        if(error){
            return res.status(400).json({message: error, input: error.input})
        }

        this.AuthService.loginUser(loginUserDto!)
        .then( (data) => res.status(200).json(data) )
        .catch( (error) => handleError(error, res) )

    }

    validateToken = (req: Request, res: Response) =>{
        const { id } = req.body

        this.AuthService.validateToken(id)
        .then( (data) => res.status(200).json(data) )
        .catch( (error) => handleError(error, res) )
    }

}