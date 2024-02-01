import { Request, Response } from "express";
import { CustomErrors, RegisterUserDto } from "../../domain";
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";


export class AuthController{

    constructor(
        public readonly AuthService: AuthService
    ){}

    private handleError = (error: unknown, res: Response ) => {
        if ( error instanceof CustomErrors ) {
          return res.status(error.statusCode).json({ error: error.message, input: error.input});
        }
    
        return res.status(500).json({ error: 'Internal server error' })
    } 

    registerUser = (req: Request, res: Response) =>{
    
        const [error, registerUserDto] = RegisterUserDto.create(req.body);

        if(error){
            return res.status(400).json({message: error})
        }

        this.AuthService.registerUser(registerUserDto!)
        .then( (data) => res.status(201).json({data}) )
        .catch( (error) => this.handleError(error, res) )

    }

    loginUser = (req: Request, res: Response) =>{
    
        const [error, loginUserDto] = LoginUserDto.create(req.body);

        if(error){
            return res.status(400).json({message: error})
        }

        this.AuthService.loginUser(loginUserDto!)
        .then( (data) => res.status(200).json(data) )
        .catch( (error) => this.handleError(error, res) )

    }

}