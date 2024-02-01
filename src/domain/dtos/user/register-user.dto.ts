import { regularExps, Position } from '../../../config';

export class RegisterUserDto{
    private constructor(
        public readonly username: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly position: Position,
        public readonly password: string,
    ){}

    
    static create(props: {[key:string]:any}): [string?, RegisterUserDto?] {
        
        const {username, firstName, lastName, email, position, password } = props
        // Username
        if(!username) return ['Username is required']
        if(username.length < 4) return ['Username must be at least 4 characters']
        if(!regularExps.username.test(username)) return ['Invalid username']
        
        // Name
        if(!firstName && !lastName) return ['Name is required']

        // Position
        if(!position) return ['Position is required']
        if(!Object.values(Position).includes(position.toUpperCase())) return ['Invalid position']

        // Email
        if(!email) return ['Email is required']
        if(!regularExps.email.test(email)) return ['Invalid email']

        // Password
        if(!password) return ['Password is required']
        if(password.length < 8) return ['Password must be at least 8 characters']

        return [undefined, new RegisterUserDto(username, firstName, lastName, email, position, password)]
    }
}