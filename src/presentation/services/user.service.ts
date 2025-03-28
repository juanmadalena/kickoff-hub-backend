import { dbConnection } from "../../data"
import { CustomErrors, MatchEntity, UpdateUserDto, UpdateUserPasswordDto, UserEntity } from "../../domain"
import { bcryptAdapter, cloudinaryAdapter } from "../../config/"
import { UpdateUserEmailDto } from '../../domain';

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
                select id, date, time, duration, location, address, num_players, min_players, max_players, price 
                from info_matches where is_canceled = false and (date + time < current_timestamp ) and is_private = false order by date desc, time desc
            )a
            inner join
            (
                select id_match from rel_players_matches where id_user = $1 and is_retired = false
            )b
            on a.id = b.id_match limit 1
        `, [id])

        const lastMatchPlayedEntity = lastMatchPlayed && MatchEntity.getMatchesFromObject(lastMatchPlayed)

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
        set first_name = $1, last_name = $2, position = $3
        where id = $4
        returning id, first_name, last_name, email, position, secondary_positions
        `, 
        [updateUserDto.firstName, updateUserDto.lastName, updateUserDto.position, updateUserDto.id]    
        )
        
        if( !existUser || existUser === 0 ) throw CustomErrors.badRequest('Invalid user')
        
        const userEntity = UserEntity.getUserFromObject(userFound)

        return {
            user:userEntity
        }
    }

    public async updateEmailUser( updateUserEmailDto: UpdateUserEmailDto ){
        const db = await dbConnection

        const { rowCount: existUser } = await db.query(
            `update info_users
            set email = $1
            where id = $2`,
            [updateUserEmailDto.email, updateUserEmailDto.idUser]
        )

        if( !existUser || existUser === 0 ) throw CustomErrors.badRequest('Invalid user')

        return {
            data: "Email updated successfully"
        }
    }

    public async updatePasswordUser( updateUserPasswordDto: UpdateUserPasswordDto ){

        const db = await dbConnection

        const { rows:[oldPassword]} = await db.query(`
            select password from info_users where id = $1
        `, [updateUserPasswordDto.idUser])

        if( !bcryptAdapter.compare(updateUserPasswordDto.oldPassword, oldPassword.password) ) throw CustomErrors.badRequest('Invalid password')

        const newPassword = bcryptAdapter.hash(updateUserPasswordDto.newPassword)

        const { rowCount: existUser } = await db.query(
            `update info_users
            set password = $1
            where id = $2`,
            [newPassword, updateUserPasswordDto.idUser]
        )
        
        if( !existUser || existUser === 0 ) throw CustomErrors.badRequest('Invalid user')

        return {
            data: "Password updated successfully"
        }
        
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

}