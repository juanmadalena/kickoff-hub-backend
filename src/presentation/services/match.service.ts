import { dbConnection } from "../../data";
import { MatchEntity, UserEntity, CreateMatchDto, LeaveMatchDto } from '../../domain';
import { UpdateMatchDto } from '../../domain/dtos/match/update-match.dto';
import { JoinMatchDto } from '../../domain/dtos/match/join-match.dto';
import { CancelMatchDto } from '../../domain/dtos/match/cancel-match.dto';

export class MatchService{

    constructor(){}

    public async getMatchesByDate( date: Date ){
    
        const db = await dbConnection
            
        const { rows: matches } = await db.query(
        `select a.id, date, time, duration, location, num_players, min_players, max_players, price, id_organizer, first_name, last_name from 
            (
                select id, date, time, duration, location, num_players, min_players, max_players, price, id_organizer 
                from info_matches where is_canceled = false and is_private = false and date = $1
            )a
            inner join
            (
                select id, first_name, last_name, photo from info_users
            )b
        on a.id_organizer = b.id order by time asc 
        `,
        [date])
        
        const matchesEntity = matches.map(MatchEntity.getMatchesFromObject)

        return {
            matches: matchesEntity
        }

    }

    public async getMatchById( id: string ){
        
        const db = await dbConnection;

        // Get match
        const { rows: [match] } = await db.query(
            `select a.id, date, time,location, latitude, longitude, duration, num_players, min_players, max_players, price, is_private, is_canceled, id_organizer, first_name, last_name from 
                (
                    select id, date, time, location, latitude, longitude, duration, description, num_players, min_players, max_players, price, id_organizer, is_private, is_canceled
                    from info_matches where id = $1
                )a
                inner join
                (
                    select id, first_name, last_name, photo from info_users
                )b
            on a.id_organizer = b.id
            `,
        [id])

        if(!match) throw new Error('Match not found')

        const matchEntity = MatchEntity.getMatchesFromObject(match)

        return {
            match: matchEntity
        }
    
    }

    public async getPlayersByMatch( idMatch: string ){
        const db = await dbConnection

        const { rows: players } = await db.query(
        `select id, first_name, last_name, position, secondary_positions, rating, photo from
            (
                select id, first_name, last_name, position, secondary_positions, rating, photo  from info_users
            )a
            inner join
            (
                select id_user from rel_players_matches where id_match = $1 and is_retired = false
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
            `insert into info_matches (date, time, duration, description, location, latitude, longitude, min_players, max_players, price, is_private, id_organizer)
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            returning id
            `,
            [newMatch.date, newMatch.time, newMatch.duration, newMatch.description, newMatch.location, newMatch.latitude, newMatch.longitude, newMatch.minPlayers, newMatch.maxPlayers, newMatch.price, newMatch.isPrivate, newMatch.idOrganizer])
            
        if(!matchCreated) throw new Error('Error creating match')

        return {
            result: 'Match created successfully'
        }
    
    }

    public async updateMatch( updateMatchDto: UpdateMatchDto ){
            
        const db = await dbConnection

        const { rows: matchUpdated } = await db.query(
        `update info_matches
                set date = $1, time = $2, duration = $3, description = $4, 
                location = $5, latitude = $6, longitude = $7, 
                min_players = $8, max_players = $9, price = $10
                is_private = $11
            where id = $12
            returning id
            `,
        [updateMatchDto.date, updateMatchDto.time, updateMatchDto.duration, updateMatchDto.description, updateMatchDto.location, updateMatchDto.latitude, updateMatchDto.longitude, updateMatchDto.minPlayers, updateMatchDto.maxPlayers, updateMatchDto.price, updateMatchDto.isPrivate, updateMatchDto.id])
                
            if(!matchUpdated) throw new Error('Error updating match')
    
            return {
                result: 'Match updated successfully'
            }
    }

    public async joinMatch( joinMatchDto: JoinMatchDto ){
       
        const db = await dbConnection;

        const { rows: matchJoined } = await db.query(
        `insert into rel_players_matches (position, id_match, id_user)
        values ($1, $2, $3) on conflict(id_user, id_match) do update set is_retired = false`,
        [joinMatchDto.position, joinMatchDto.idMatch, joinMatchDto.idUser])

        if(!matchJoined) throw new Error('Error joining to match')

        return {
            result: 'User joined to match successfully'
        }

    }

    public async leaveMatch( leaveMatchDto: LeaveMatchDto){
        const db = await dbConnection;

        const { rowCount: matchLeaved } = await db.query(
            `UPDATE rel_players_matches 
            SET is_retired = true, retired_at = now()
            WHERE id_match = $1 and id_user = $2`,
            [leaveMatchDto.idMatch, leaveMatchDto.idUser])

        if(!matchLeaved) throw new Error('Error leaving match')

        return {
            result: 'Leaved match successfully'
        }
    }

    public async cancelMatch( cancelMatchDto: CancelMatchDto ){
        
        const db = await dbConnection;

        const { rowCount: matchCanceled } = await db.query(
        `update info_matches
        set is_canceled = true
        where id = $1 and id_organizer = $2`,
        [cancelMatchDto.idMatch, cancelMatchDto.idUser])

        if(!matchCanceled) throw new Error('Error canceling match')

        return {
            result: 'Match canceled successfully'
        }
    }

}