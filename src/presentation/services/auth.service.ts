import { JwtAdapter, bcryptAdapter } from "../../config"
import { dbConnection } from "../../data"
import { CustomErrors, RegisterUserDto, UserEntity } from "../../domain"
import { LoginUserDto } from '../../domain';

export class AuthService{

    constructor(){}

    public async registerUser( registerUserDto: RegisterUserDto ){
        
        const db = await dbConnection

        const { rowCount: existUsername } = await db.query("select username from info_users where username = $1", [registerUserDto.username])
        if ( existUsername && existUsername > 0 ) throw CustomErrors.badRequest('Username already exists', 'username')

        const { rowCount: existEmail } = await db.query("select email from info_users where email = $1", [registerUserDto.email])
        if ( existEmail && existEmail > 0 ) throw CustomErrors.badRequest('Email already exists', 'email')

        const hashedPassword = bcryptAdapter.hash(registerUserDto.password)

        try {
            
            const { rows: [newUser] } = await db.query(`
                insert into info_users (username, first_name, last_name, email, position, password) 
                values ($1, $2, $3, $4, $5, $6) 
                returning id, username, first_name, last_name, email, position, password
                `, 
            [registerUserDto.username, registerUserDto.firstName, registerUserDto.lastName, registerUserDto.email, registerUserDto.position, hashedPassword])

            const userEntity = UserEntity.getUserFromObject(newUser)

            const token = await JwtAdapter.generateToken({id: newUser.id})
            if(!token) throw CustomErrors.internalServerError('Error generating token')

            return {
                user: userEntity,
                token
            }
        } 
        catch (error) {
            throw CustomErrors.internalServerError( `${error}` )
        }        

    }

    public async loginUser( loginUserDto: LoginUserDto ){

        const db = await dbConnection

        const { rows: [userFound], rowCount: existUsername } = await db.query(`
            select id, username, first_name, last_name, email, position, password from info_users 
            where (username = $1 or email = $1)
            `, 
            [loginUserDto.username])

        if( !existUsername || existUsername === 0 ) throw CustomErrors.badRequest('Invalid username or password')

        const isMatching = bcryptAdapter.compare(loginUserDto.password, userFound.password)
        if( !isMatching ) throw CustomErrors.badRequest('Invalid username or password')

        const userEntity = UserEntity.getUserFromObject(userFound)

        const token = await JwtAdapter.generateToken({id: userFound.id})
        if(!token) throw CustomErrors.internalServerError('Error generating token')


        return {
            user:userEntity, 
            token
        }
    }

    validateToken = async (userId: string) => {
        
        const db = await dbConnection
        
        const token = await JwtAdapter.generateToken({id: userId})
        if(!token) throw CustomErrors.internalServerError('Error generating token')

        const { rows: [user], rowCount: existUser } = await db.query(`
            select id, username, first_name, last_name, email, position from info_users 
            where id = $1
            `, 
        [userId])
        if( !existUser || existUser === 0 ) throw CustomErrors.badRequest('Invalid user')

        const userEntity = UserEntity.getUserFromObject(user)


        return { token, user: userEntity}
    }
}