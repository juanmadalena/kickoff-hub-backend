import { regularExps, Position } from '../../../config';
import { CustomError } from '../../../config/interfaces/interfaces';

export class RegisterUserDto{
    private constructor(
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly position: Position,
        public readonly password: string,
    ){}

    
    static create(props: {[key:string]:any}): [CustomError?, RegisterUserDto?] {
        
        const { firstName, lastName, email, position, password } = props
        
        // Name
        if(!firstName) return [{message:'Name is required', input:'firstName'}]

        if(!lastName) return [{message:'First name is required', input:'lastName'}]

        // Position
        if(!position) return [{message:'Position is required', input:'position'}]
        if(!Object.values(Position).includes(position.toUpperCase())) return [{message:'Invalid position', input:'position'}]

        // Email
        if(!email) return [{message:'Email is required', input:'email'}]
        if(!regularExps.email.test(email)) return [{message:'Invalid email', input:'email'}]
        
        // Password
        if(!password) return [{message:'Password is required', input:'password'}]
        if(password.length < 8) return [{message:'Password must be at least 8 characters', input:'password'}]

        return [undefined, new RegisterUserDto( firstName, lastName, email, position, password)]
    }
}