import { dbConnection } from "../../data";
import { MatchEntity, UserEntity, CreateMatchDto, LeaveMatchDto, PlayersToRateDto, RateUserDto, CustomErrors, RemoveMatchDto } from '../../domain';
import { UpdateMatchDto } from '../../domain/dtos/match/update-match.dto';
import { JoinMatchDto } from '../../domain/dtos/match/join-match.dto';
import { CancelMatchDto } from '../../domain/dtos/match/cancel-match.dto';
import { geocodeAdapter } from "../../config";

export class MatchService {

    constructor() { }

    public async getMatchesByDate(date: Date) {

        const db = await dbConnection

        const { rows: matches } = await db.query(
            `select id, date, time, duration, location, address, num_players, min_players, max_players, price 
            from info_matches 
            where is_canceled = false and is_private = false and date = $1 order by time asc `,
            [date])

        const matchesEntity = matches.map(MatchEntity.getMatchesFromObject)

        return {
            matches: matchesEntity
        }

    }

    public async getMatchById(id: string) {

        const db = await dbConnection;

        // Get match
        const { rows: [match] } = await db.query(
            `select a.id, date, time, location, address, description, latitude, longitude, duration, num_players, min_players, max_players, price, is_private, is_canceled, id_organizer, first_name, last_name, photo from 
                (
                    select id, date, time, location, address, latitude, longitude, duration, description, num_players, min_players, max_players, price, id_organizer, is_private, is_canceled
                    from info_matches where id = $1
                )a
                inner join
                (
                    select id, first_name, last_name, photo from info_users
                )b
            on a.id_organizer = b.id
            `,
            [id])

        if (!match) throw new Error('Match not found')

        const matchEntity = MatchEntity.getMatchesFromObject(match)

        return {
            match: matchEntity
        }

    }

    public async getPlayersByMatch(idMatch: string) {
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

    public async getMatchesPlayedByUser(idUser: string) {

        const db = await dbConnection

        const { rows: matches } = await db.query(`
            select id, date, time, duration, location, address, num_players, min_players, max_players, price from
                (
                    select id, date, time, duration, location, address, num_players, min_players, max_players, price from info_matches im 
                )a
                inner join
                (
                    select id_match from rel_players_matches where id_user = $1 and is_retired = false
                )b
            on a.id = b.id_match order by date desc, time desc`
            , [idUser])

        if (!matches) throw new Error('Matches not found')

        const matchesEntity = matches.map(MatchEntity.getMatchesFromObject)

        return {
            matches: matchesEntity
        }

    }

    public async getMatchesOrganizedByUser(idUser: string) {
        const db = await dbConnection

        const { rows: matches } = await db.query(`
        select id, date, time, duration, location, address, num_players, min_players, max_players, price, is_canceled from info_matches 
        where id_organizer = $1 order by date, time asc
        `, [idUser])

        if (!matches) throw new Error('Matches not found')

        const matchesEntity = matches.map(MatchEntity.getMatchesFromObject)

        return {
            matches: matchesEntity
        }
    }

    public async createMatch(newMatch: CreateMatchDto) {

        const db = await dbConnection

        // Get coordinates by id place
        const { lat, lng } = await geocodeAdapter.getCoordinatedByIdPlace(newMatch.idAddress)
        if (!lat || !lng) throw new Error('Address not found')

        const { rows: matchCreated } = await db.query(
            `insert into info_matches (date, time, duration, description, location, min_players, max_players, is_private, id_organizer, latitude, longitude, address)
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            `,
            [newMatch.date, newMatch.time, newMatch.duration, newMatch.description, newMatch.location, newMatch.minPlayers, newMatch.maxPlayers, newMatch.isPrivate, newMatch.idOrganizer, lat, lng, newMatch.address])

        if (!matchCreated) throw new Error('Error creating match')

        return {
            data: 'Match created successfully'
        }

    }

    public async updateMatch(updateMatchDto: UpdateMatchDto) {

        const db = await dbConnection

        const { rows: matchUpdated } = await db.query(
            `update info_matches
                set duration = $1, description = $2, 
                min_players = $3, max_players = $4
            where id = $5
            returning id
            `,
            [updateMatchDto.duration, updateMatchDto.description, updateMatchDto.minPlayers, updateMatchDto.maxPlayers, updateMatchDto.id])

        if (!matchUpdated) throw new Error('Error updating match')

        return {
            data: 'Match updated successfully'
        }
    }

    public async joinMatch(joinMatchDto: JoinMatchDto) {

        const db = await dbConnection;

        const { rows: matchJoined } = await db.query(
            `insert into rel_players_matches (position, id_match, id_user)
        values ($1, $2, $3) on conflict(id_user, id_match) do update set is_retired = false`,
            [joinMatchDto.position, joinMatchDto.idMatch, joinMatchDto.idUser])

        if (!matchJoined) throw new Error('Error joining to match')

        return {
            data: 'User joined to match successfully'
        }

    }

    public async leaveMatch(leaveMatchDto: LeaveMatchDto) {
        const db = await dbConnection;

        const { rowCount: matchLeaved } = await db.query(
            `UPDATE rel_players_matches 
            SET is_retired = true, retired_at = now()
            WHERE id_match = $1 and id_user = $2`,
            [leaveMatchDto.idMatch, leaveMatchDto.idUser])

        if (!matchLeaved) throw new Error('Error leaving match')

        return {
            data: 'Leaved match successfully'
        }
    }

    public async removePlayer( removeMatchDto: RemoveMatchDto) {
        const db = await dbConnection

        const { rowCount: isOrganizer } = await db.query(
            `select id from info_matches where id = $1 and id_organizer = $2`
            ,[removeMatchDto.idMatch, removeMatchDto.idUser]
        )

        if (!isOrganizer) throw new Error('User is not the organizer')

        const { rowCount: playerRemoved } = await db.query(
            `update rel_players_matches
            set is_retired = true, retired_at = now()
            where id_match = $1 and id_user = $2 `,
            [removeMatchDto.idMatch, removeMatchDto.idUserToRemove])

        if (!playerRemoved) throw new Error('Error removing player')

        return {
            data: 'Player removed successfully'
        }
    }

    public async cancelMatch(cancelMatchDto: CancelMatchDto) {

        const db = await dbConnection;

        const { rowCount: matchCanceled } = await db.query(
        `update info_matches
        set is_canceled = true
        where id = $1 and id_organizer = $2`,
            [cancelMatchDto.idMatch, cancelMatchDto.idUser])

        if (!matchCanceled) throw new Error('Error canceling match')

        return {
            data: 'Match canceled successfully'
        }
    }

    public async getPlayersToRate(playersToRateDto: PlayersToRateDto) {
        const db = await dbConnection

        // Verify if user played the match
        const { rowCount: playedMatch } = await db.query(
            `select id from rel_players_matches where id_match = $1 and id_user = $2`,
        [playersToRateDto.idMatch, playersToRateDto.idUser])

        if (!playedMatch) throw CustomErrors.badRequest('User did not play the match')

        const { rows: players } = await db.query(
            `select C.*, rating from
            (
                select B.* from 
                (
                    select id_user from rel_players_matches where id_match = $1
                )A
                inner join 
                (
                    select id, first_name, last_name, position, photo from info_users 
                )B
                on A.id_user = B.id
            )C
            left join
            (
                select id_user_rated ,rating from info_ratings where id_match = $1 and id_user_rated_by = $2
            )D
            on C.id = D.id_user_rated where id != $2 order by rating desc, C.first_name, C.last_name
        `,
        [playersToRateDto.idMatch, playersToRateDto.idUser])

        const playersEntity = players.map(UserEntity.getUserFromObject)

        return {
            players: playersEntity
        }
    }
    
    public async rateUser( rateUserDto: RateUserDto ){
        const db = await dbConnection

        const { rowCount: existUser } = await db.query(
            `insert into info_ratings ( rating, id_match, id_user_rated, id_user_rated_by )
            values ($1, $2, $3, $4) 
            on conflict(id_match, id_user_rated, id_user_rated_by) do update set rating = $1
            returning id`,
            [rateUserDto.rate, rateUserDto.idMatch, rateUserDto.idUserRated, rateUserDto.idUser]
        )
        console.log('rateUserDto', existUser)

        if( !existUser || existUser === 0 ) throw CustomErrors.badRequest('Invalid user')

        return {
            data: "User rated successfully"
        }
    }

}