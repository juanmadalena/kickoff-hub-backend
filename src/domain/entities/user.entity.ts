import { Position, regularExps } from '../../config';
import { CustomErrors } from '../index';

export class UserEntity{

    constructor(
        public readonly id: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly username: string,
        public readonly position: Position,
        public readonly email: string,
        public readonly password?: string,
        public readonly photo?: string,
        public readonly secondPosition?: Position[],
    ){}

    static fromObject(object: {[key: string]: any}): UserEntity{
        console.log("objectasdasd", object)
        const { id, firstName, lastName, username, email, position, secondPosition, password = null, photo = null } = object

        if(!id)  throw CustomErrors.badRequest('Invalid id')
        if(!firstName) throw CustomErrors.badRequest('Invalid name')
        if(!lastName) throw CustomErrors.badRequest('Invalid email')
        if(!email && regularExps.email.test(email)) throw CustomErrors.badRequest('Invalid email')
        if(!position) throw CustomErrors.badRequest('Invalid position')
        if(secondPosition) {
            if(secondPosition.length > 2) throw CustomErrors.badRequest('Invalid second position')
            if(!secondPosition.every((position: string) => Object.values(Position).includes(position.toLocaleUpperCase() as Position))) throw CustomErrors.badRequest('Invalid second position')
        } 

        return new UserEntity(id, firstName, lastName, username, position, email, password, photo, secondPosition,)

    }

}