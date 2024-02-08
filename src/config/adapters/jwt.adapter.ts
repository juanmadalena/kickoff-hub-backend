import jwt from 'jsonwebtoken'
import { envs } from '../envs'

const SEED = envs.JWT_SECRET
const EXPIRATION_TIME = envs.JWT_EXPIRATION_TIME

export const JwtAdapter = {

    generateToken: async (payload: any) => {
        return new Promise((resolve) => {
            jwt.sign(payload, SEED, { expiresIn: EXPIRATION_TIME }, (err, token) => {
                
                if (err) return resolve(null)
                
                resolve(token)
            })
        })
    },

    validateToken: <T>(token: string): Promise<T|null> => {
        return new Promise((resolve) => {
            jwt.verify(token, SEED, (err, decoded) => {

                if (err) return resolve(null)
                
                resolve(decoded as T)
            })
        })
    }

}