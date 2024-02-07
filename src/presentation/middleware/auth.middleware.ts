import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { dbConnection } from "../../data";

export class AuthMiddleware {

    static async validateToken(req: Request, res: Response, next: NextFunction) {

        const authorization = req.headers.authorization
        if( 
            !authorization 
            || typeof authorization !== 'string' 
            || authorization.length === 0 
            || !authorization.startsWith('Bearer ')
        ){

            return res.status(401).json({message: 'Unauthorized'})
        } 

        const token = authorization.split(' ').at(-1) || ''

        try {
            const db = await dbConnection
            const payload = await JwtAdapter.validateToken<{id: string}>(token)
            if( !payload ) return res.status(401).json({message: 'Unauthorized'})

            //Check if the user exists in the database
            const { rowCount: existUser } = await db.query("select id from info_users where id = $1", [payload.id])
            if( !existUser || existUser === 0 ) return res.status(401).json({message: 'Unauthorized'})

            req.body.id = payload.id

            next()
            
        } catch (error) {
            console.log('error', error)
            res.status(500).json( { error: 'Internal server error' } )
        }

    }

}