import { CustomErrors } from '../index';

export class UserEntity{

    constructor(
        public readonly id: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly username: string,
        public readonly position: string,
        public readonly email: string,
        public readonly password: string,
        public readonly photo: string,
    ){}

    static fromObject(object: {[key: string]: any}): UserEntity{
        const { id, firstName, lastName, username, email, position, password, photo = null } = object

        if(!id)  throw CustomErrors.badRequest('Invalid id')
        if(!firstName) throw CustomErrors.badRequest('Invalid name')
        if(!lastName) throw CustomErrors.badRequest('Invalid email')
        if(!email) throw CustomErrors.badRequest('Invalid email')
        if(!position) throw CustomErrors.badRequest('Invalid password')
        if(!password) throw CustomErrors.badRequest('Invalid password')

        return new UserEntity(id, firstName, lastName, username, position, email, password, photo)

    }

}