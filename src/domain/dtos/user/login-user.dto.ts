import { regularExps } from '../../../config';

export class LoginUserDto{
    private constructor(
        public readonly username: string,
        public readonly password: string,
    ){}

    
    static create(props: {[key:string]:any}): [string?, LoginUserDto?] {
        
        const {username, password } = props
        
        // Username
        if(!username) return ['Username or Email is required']
        

        // Password
        if(!password) return ['Password is required']
        if(password.length < 8) return ['Password must be at least 8 characters']

        return [undefined, new LoginUserDto(username, password)]
    }
}