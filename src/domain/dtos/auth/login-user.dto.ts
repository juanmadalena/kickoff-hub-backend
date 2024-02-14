import { CustomError } from "../../../config"

export class LoginUserDto{
    private constructor(
        public readonly email: string,
        public readonly password: string,
    ){}

    
    static create(props: {[key:string]:any}): [CustomError?, LoginUserDto?] {
        
        const {email, password } = props
        // Email
        if(!email) return [{message:'Email is required'}]
        
        // Password
        if(!password) return [{message:'Password is required'}]

        return [undefined, new LoginUserDto(email, password)]
    }
}