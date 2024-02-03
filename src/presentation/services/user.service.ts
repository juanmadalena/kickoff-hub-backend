import { JwtAdapter, bcryptAdapter } from "../../config"
import { dbConnection } from "../../data"
import { CustomErrors, RegisterUserDto, UserEntity } from "../../domain"
import { LoginUserDto } from '../../domain';
import { UpdateUserDto } from '../../domain';

export class UserService{

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

            return {
                user: userEntity
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

    public async updateUser( updateUserDto: UpdateUserDto ){
        
        const db = await dbConnection
        
        const { rows: [userFound], rowCount: existUser } = await db.query(`
        update info_users
        set first_name = $1, last_name = $2, username = $3, position = $4, secondary_positions = $5, email = $6
        where id = $8
        returning id, username, first_name, last_name, email, position, secondary_positions
        `, 
        [updateUserDto.firstName, updateUserDto.lastName, updateUserDto.username, updateUserDto.position, updateUserDto.secondPosition, updateUserDto.email, updateUserDto.id]    
        )
        
        if( !existUser || existUser === 0 ) throw CustomErrors.badRequest('Invalid user')
        
        const userEntity = UserEntity.getUserFromObject(userFound)

        return {
            user:userEntity
        }
    }

    public async updatePasswordUser( userId: string, password: string ){
        throw new Error('Method not implemented')
    }

    public async uploadProfilePhotoUser( userId: string, photo: string ){
        throw new Error('Method not implemented')
    }

}