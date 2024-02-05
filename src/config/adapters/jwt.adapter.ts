import jwt from 'jsonwebtoken'
import { envs } from '../envs'

const SEED = envs.JWT_SECRET

export const JwtAdapter = {

    generateToken: async (payload: any, duration: string = '2h') => {
        return new Promise((resolve) => {
            jwt.sign(payload, SEED, { expiresIn: duration }, (err, token) => {
                
                if (err) return resolve(null)
                
                resolve(token)
            })
        })
    },

    validateToken: (token: string): any => {
        return new Promise((resolve) => {
            jwt.verify(token, SEED, (err, decoded) => {

                if (err) return resolve(null)
                
                resolve(decoded)
            })
        })
    }

}