import { dbConnection } from "../../data"
import { CustomErrors, MatchEntity, UpdateUserDto, UserEntity } from "../../domain"
import { RateUserDto } from "../../domain/dtos/user/rate-user.dto"
import { cloudinaryAdapter } from "../../config/"

export class UserService{

    constructor(){}

    public async getUserDetailsById( id: string ){
        const db = await dbConnection

        const { rows: [userFound], rowCount: existUser } = await db.query(`
            select id, first_name, last_name, position, photo, rating
            from info_users
            where id = $1
        `, [id])

        if( !existUser || existUser === 0 ) throw CustomErrors.badRequest('Invalid user')

        const userEntity = UserEntity.getUserFromObject(userFound)

        const { rows: [matchesPlayed, matchesOrganized] } = await db.query(`
            select count(*) from rel_players_matches 
            where id_user = $1 and is_retired = false
            union all
            select count(*) from info_matches 
            where id_organizer = $1 and is_canceled = false
        `, [id])

        const { rows: [lastMatchPlayed] } = await db.query(`
            select a.* from 
            (
                select id, date, time, duration, location, num_players, min_players, max_players, price 
                from info_matches where is_canceled = false and (date + time < current_timestamp ) and is_private = false order by date desc, time desc
            )a
            inner join
            (
                select id_match from rel_players_matches where id_user = $1 and is_retired = false
            )b
            on a.id = b.id_match limit 1
        `, [id])


        const lastMatchPlayedEntity = lastMatchPlayed ?? MatchEntity.getMatchesFromObject(lastMatchPlayed)

        return {
            user: userEntity,
            matchesPlayed,
            matchesOrganized,
            lastMatchPlayed: lastMatchPlayedEntity
        }
    }

    public async updateUser( updateUserDto: UpdateUserDto ){
        
        const db = await dbConnection
        
        const { rows: [userFound], rowCount: existUser } = await db.query(`
        update info_users
        set first_name = $1, last_name = $2, position = $3, secondary_positions = $4, email = $5
        where id = $6
        returning id, first_name, last_name, email, position, secondary_positions
        `, 
        [updateUserDto.firstName, updateUserDto.lastName, updateUserDto.position, updateUserDto.secondPosition, updateUserDto.email, updateUserDto.id]    
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

    public async uploadProfilePhotoUser( id: string, photo: Buffer ){
        const secure_url = await cloudinaryAdapter.upload({ file: photo, name: id })
        
        if( !secure_url ) throw CustomErrors.badRequest('Error uploading profile picture')
        
        const db = await dbConnection

        const { rowCount: existUser } = await db.query(
            `update info_users
            set photo = $1
            where id = $2`
            ,[secure_url, id])

        if( !existUser || existUser === 0 ) throw CustomErrors.badRequest('Invalid user')

        return {
            data: "Profile picture uploaded successfully"
        }
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