import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";

export class AuthMiddleware {

    static async validateToken(req: Request, res: Response, next: NextFunction) {

        const token = req.headers.authorization
        if(!token) return res.status(401).json({message: 'Unauthorized'})
        if(typeof token !== 'string') return res.status(401).json({message: 'Unauthorized'})

        try {

            const isValid = await JwtAdapter.validateToken(token)
            if(!isValid) return res.status(401).json({message: 'Unauthorized'})

            next()
            
        } catch (error) {
            res.status(500).json( { error: 'Internal server error' } )
        }

    }

}