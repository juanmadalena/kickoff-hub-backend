import { hashSync, genSaltSync, compareSync } from 'bcryptjs'

export const bcryptAdapter = {

    hash: (password: string): string => {
        const salt = genSaltSync()
        return hashSync(password, salt)
    },

    compare: (password: string, hash: string): boolean => {
        return compareSync(password, hash)
    }

}