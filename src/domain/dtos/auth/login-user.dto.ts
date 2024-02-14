import { CustomError, regularExps } from "../../../config"

export class LoginUserDto{
    private constructor(
        public readonly email: string,
        public readonly password: string,
    ){}

    
    static create(props: {[key:string]:any}): [CustomError?, LoginUserDto?] {
        
        const {email, password } = props
        
        // Email
        if(!email) return [{message:'Email is required'}]
        if(regularExps.email.test(email)) return [{message:'Invalid email'}]
        

        // Password
        if(!password) return [{message:'Password is required'}]
        if(password.length < 8) return [{message:'Password must be at least 8 characters'}]

        return [undefined, new LoginUserDto(email, password)]
    }
}