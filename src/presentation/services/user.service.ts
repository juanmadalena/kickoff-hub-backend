import { dbConnection } from "../../data"
import { CustomErrors, UpdateUserDto, UserEntity } from "../../domain"
import { RateUserDto } from "../../domain/dtos/user/rate-user.dto"

export class UserService{

    constructor(){}

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

    public async updatePasswordUser( _userId: string, _password: string ){
        throw new Error('Method not implemented')
    }

    public async uploadProfilePhotoUser( _userId: string, _photo: string ){
        throw new Error('Method not implemented')
    }

    public async rateUser( rateUserDto: RateUserDto ){
        const db = await dbConnection

        const { rowCount: existUser } = await db.query(
        `insert into info_ratings ( rating, id_match, id_user_rated, id_user_rated_by ))
        values ($1, $2, $3, $4)
        returning id`,
        [rateUserDto.rate, rateUserDto.idMatch, rateUserDto.idUserRated, rateUserDto.idUser]
        )

        if( !existUser || existUser === 0 ) throw CustomErrors.badRequest('Invalid user')

        return {
            data: "User rated successfully"
        }
    }
}