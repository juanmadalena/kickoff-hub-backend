import { dbConnection } from "../../data";
import { MatchEntity, UserEntity, CreateMatchDto } from '../../domain';
import { UpdateMatchDto } from '../../domain/dtos/match/update-match.dto';

export class MatchService{

    constructor(){}

    public async getMatchesByDate( date: Date ){
    
        const db = await dbConnection
            
        const { rows: matches } = await db.query(
        `select a.id, date, time, duration, description, location, latitude, longitude, num_players, min_players, max_players, price, id_organizer, first_name, last_name, username from 
            (
                select id, date, time, duration, description, location, latitude, longitude, num_players, min_players, max_players, price, id_organizer 
                from info_matches where is_canceled = false and is_private = false and date = $1
            )a
            inner join
            (
                select id, first_name, last_name, username, photo from info_users
            )b
        on a.id_organizer = b.id
        `,
        [date])
        
        const matchesEntity = matches.map(MatchEntity.getMatchesFromObject)

        return {
            matches: matchesEntity
        }

    }

    public async getPlayersByMatch( idMatch: string ){
        const db = await dbConnection

        const { rows: players } = await db.query(
        `select id, first_name, last_name, username, position, secondary_positions, rating, photo from
            (
                select id, first_name, last_name, username, position, secondary_positions, rating, photo  from info_users
            )a
            inner join
            (
                select id_user from rel_players_matches where id_match = $1
            )b
        on a.id = b.id_user
        `,
        [idMatch])
        
        const playersEntity = players.map(UserEntity.getUserFromObject)

        return {
            players: playersEntity
        }
    }

    public async createMatch( newMatch: CreateMatchDto ){
        
        const db = await dbConnection
            
        const { rows: matchCreated } = await db.query(
            `insert into info_matches (date, time, duration, description, location, latitude, longitude, min_players, max_players, price, id_organizer)
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            returning id
            `,
            [newMatch.date, newMatch.time, newMatch.duration, newMatch.description, newMatch.location, newMatch.latitude, newMatch.longitude, newMatch.minPlayers, newMatch.maxPlayers, newMatch.price, newMatch.idOrganizer])
            
        if(!matchCreated) throw new Error('Error creating match')

        return {
            result: 'Match created successfully'
        }
    
    }

    public async updateMatch( updateMatchDto: UpdateMatchDto ){
            
        const db = await dbConnection

        try{
        console.log('updateMatchDto', updateMatchDto);
        
        const { rows: matchUpdated } = await db.query(
        `update info_matches
                set date = $1, time = $2, duration = $3, description = $4, 
                location = $5, latitude = $6, longitude = $7, 
                min_players = $8, max_players = $9, price = $10
            where id = $11
            returning id
            `,
        [updateMatchDto.date, updateMatchDto.time, updateMatchDto.duration, updateMatchDto.description, updateMatchDto.location, updateMatchDto.latitude, updateMatchDto.longitude, updateMatchDto.minPlayers, updateMatchDto.maxPlayers, updateMatchDto.price, updateMatchDto.id])
                
            if(!matchUpdated) throw new Error('Error updating match')
    
            return {
                result: 'Match updated successfully'
            }
        }
        catch(error){
            console.log(error)
        }
    }

}