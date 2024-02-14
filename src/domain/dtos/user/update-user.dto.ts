import { Position, regularExps } from "../../../config";

export class UpdateUserDto {

    private constructor(
        public readonly id: string,
        public readonly firstName?: string,
        public readonly lastName?: string,
        public readonly position?: Position,
        public readonly secondPosition?: Position[],
        public readonly email?: string,
        public readonly password?: string,
    ) { }


    get values() {
        const values: { [key: string]: any } = {}

        if (this.firstName) values.firstName = this.firstName
        if (this.lastName) values.lastName = this.lastName
        if (this.position) values.position = this.position
        if (this.secondPosition) values.secondPosition = this.secondPosition
        if (this.email) values.email = this.email
        if (this.password) values.password = this.password

        return values
    }

    static create(props: { [key: string]: any }): [string?, UpdateUserDto?] {
        const { id, firstName, lastName, position, secondPosition, email, password } = props

        // Id
        if (!id) return ['Id is required']

        // Name
        if (firstName && firstName.length < 2) return ['First name must be at least 2 characters']
        if (lastName && lastName.length < 2) return ['Last name must be at least 2 characters']

        // Position
        if (!position && !Object.values(Position).includes(position)) return ['Invalid position']

        // Second Position
        // if (secondPosition && secondPosition.every() ) return ['Invalid second position']
        // if (secondPosition && secondPosition.length > 0) {
        //     if (secondPosition.length > 2) return ['Invalid second position']
        //     if (!secondPosition.every((position: string) => Object.values(Position).includes(position))) return ['Invalid second position']
        // }

        // Email
        if (email && !regularExps.email.test(email)) return ['Invalid email']

        // Password
        if (password) return ['Password must be at least 8 characters']

        return [undefined, new UpdateUserDto(id, firstName, lastName, position, secondPosition, email, password)]
    }

}