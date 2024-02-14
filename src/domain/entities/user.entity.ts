import { Position, regularExps } from '../../config';
import { CustomErrors } from '../index';

export class UserEntity {

    constructor(
        public readonly id: string,
        public readonly first_name: string,
        public readonly last_name: string,
        public readonly position?: Position,
        public readonly email?: string,
        public readonly photo?: string,
        public readonly secondary_positions?: Position[],
        public readonly rating?: number
    ) { }

    static getUserFromObject(object: { [key: string]: any }): UserEntity {
        const { id, first_name, last_name, email, position, rating, secondary_positions, photo } = object

        if (!id) throw CustomErrors.badRequest('Invalid id')
        if (!first_name) throw CustomErrors.badRequest('Invalid name')
        if (!last_name) throw CustomErrors.badRequest('Invalid email')
        if (!email && regularExps.email.test(email)) throw CustomErrors.badRequest('Invalid email')
        if (!position) throw CustomErrors.badRequest('Invalid position')
        if (secondary_positions) {
            if (secondary_positions.length > 2) throw CustomErrors.badRequest('Invalid second position')
            if (!secondary_positions.every((position: string) => Object.values(Position).includes(position.toLocaleUpperCase() as Position))) throw CustomErrors.badRequest('Invalid second position')
        }

        return new UserEntity(id, first_name, last_name, position, email, photo, secondary_positions, rating)
    }

    static getOrganizerFromObject(object: { [key: string]: any }): UserEntity {
        const { id, first_name, last_name, photo } = object

        if (!id) throw CustomErrors.badRequest('Invalid id')
        if (!first_name) throw CustomErrors.badRequest('Invalid name')
        if (!last_name) throw CustomErrors.badRequest('Invalid email')

        return new UserEntity(id, first_name, last_name, undefined, undefined, photo)
    }
}