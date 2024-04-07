import { CustomError } from "../../../config"

export class LoginUserDto{
    private constructor(
        public readonly email: string,
        public readonly password: string,
    ){}

    
    static create(props: {[key:string]:any}): [CustomError?, LoginUserDto?] {
        let { email } = props
        const { password } = props
        // Email
        if(!email) return [{message:'Email is required'}]
        if(typeof email !== 'string') return [{message:'Invalid email'}]
        if(email.trim().length === 0) return [{message:'Email is required'}]
        email = email.toLowerCase()
        
        // Password
        if(!password) return [{message:'Password is required'}]

        return [undefined, new LoginUserDto(email, password)]
    }
}