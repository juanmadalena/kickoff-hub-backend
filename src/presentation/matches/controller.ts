import { Request, Response } from "express";
import { MatchService } from "../services/match.service";
import { CreateMatchDto, UpdateMatchDto, handleError, JoinMatchDto, CancelMatchDto, LeaveMatchDto, PlayersToRateDto, RateUserDto, RemoveMatchDto } from "../../domain";

export class MatchController {
    
    constructor(public readonly MatchService: MatchService) { }

    //Get all matches by date
    getMatches = (req: Request, res: Response) => {
        // If date is not provided, use today's date
        const date: Date = req.query.date ? new Date( req.query.date+'' ) : new Date()

        this.MatchService.getMatchesByDate( date )
            .then((data) => res.status(200).json(data))
            .catch((error) => handleError(error, res))

    }

    //Get match by id
    getMatch = (req: Request, res: Response) => {
        const id: string = req.params.id
        if(!id) return res.status(400).json({message: 'Id is required'})

        this.MatchService.getMatchById( id )
            .then((data) => res.status(200).json(data))
            .catch((error) => handleError(error, res))

    }

    //Get all players by match
    getPlayersByMatch = (req: Request, res: Response) => {
        const id: string = req.params.id
        if(!id) return res.status(400).json({message: 'Id is required'})

        this.MatchService.getPlayersByMatch( id )
            .then((data) => res.status(200).json(data))
            .catch((error) => handleError(error, res))

    }

    //Get all matches played by user
    getMatchesPlayed = (req: Request, res: Response) => {

        const { idUser } = req.body

        this.MatchService.getMatchesPlayedByUser( idUser)
            .then((data) => res.status(200).json(data))
            .catch((error) => handleError(error, res))
    }

    //Get all matches organized by user
    getMatchesOrganized = (req: Request, res: Response) => {
        const { idUser } = req.body

        this.MatchService.getMatchesOrganizedByUser( idUser )
            .then((data) => res.status(200).json(data))
            .catch((error) => handleError(error, res))
    }

    //Create a new match
    createMatch = (req: Request, res: Response) => {
        const [error, newMatch] = CreateMatchDto.create(req.body)

        if(error){
            console.log('error', error)
            return res.status(400).json({message: error})
        }

        this.MatchService.createMatch(newMatch!)
            .then((data) => res.status(201).json(data))
            .catch((error) => handleError(error, res))
    }

    //Update a match
    updateMatch = (req: Request, res: Response) => {
        const [error, updateMatch] = UpdateMatchDto.create(req.body)

        if(error){
            return res.status(400).json({message: error})
        }

        this.MatchService.updateMatch(updateMatch!)
            .then((data) => res.status(200).json(data))
            .catch((error) => handleError(error, res))
    }

    //Join a match
    joinMatch = (req: Request, res: Response) => {
        const idMatch: string = req.params.id;
        const { idUser, position } = req.body

        const [error, joinMatchDto] = JoinMatchDto.create({ idMatch, idUser, position })

        if(error) return res.status(400).json({message: error})

        this.MatchService.joinMatch(joinMatchDto!)
            .then((data) => res.status(200).json(data))
            .catch((error) => handleError(error, res))
    }

    //Leave a match
    leaveMatch = (req: Request, res: Response) => {
        const idMatch: string = req.params.id;
        const { idUser } = req.body

        const [error, leaveMatchDto] = LeaveMatchDto.create({ idMatch, idUser })

        if(error) return res.status(400).json({message: error})

        this.MatchService.leaveMatch(leaveMatchDto!)
            .then((data) => res.status(200).json(data))
            .catch((error) => handleError(error, res))
    }

    //Cancel a match
    cancelMatch = (req: Request, res: Response) => {
        const idMatch: string = req.params.id;
        const { idUser } = req.body

        const [ error, cancelMatchDto ] = CancelMatchDto.create({ idMatch, idUser })

        if(error) return res.status(400).json({message: error})

        this.MatchService.cancelMatch(cancelMatchDto!)
            .then((data) => res.status(200).json(data))
            .catch((error) => handleError(error, res))
    }

    removePlayer = (req: Request, res: Response) => {
        const idMatch: string = req.params.id;

        const [error, removePlayerDto] = RemoveMatchDto.create({ idMatch, ...req.body })
        
        if(error) return res.status(400).json({message: error})

        this.MatchService.removePlayer( removePlayerDto! )
            .then((data) => res.status(200).json(data))
            .catch((error) => handleError(error, res))
    }

    //Players to rate
    getPlayersToRate = (req: Request, res: Response) => {
        const idMatch: string = req.params.id;

        const [error, playersToRateDto] = PlayersToRateDto.create({ idMatch, ...req.body})

        if(error) return res.status(400).json({message: error})

        this.MatchService.getPlayersToRate(playersToRateDto!)
            .then((data) => res.status(200).json(data))
            .catch((error) => handleError(error, res))
    }

    rateUser = (req: Request, res: Response) => {
        const idMatch: string = req.params.id;
        const { idUser, idUserRated, rate } = req.body

        const [error, rateUserDto] = RateUserDto.create({ idMatch, idUser, idUserRated, rate })
        console.log('rateUserDto', error)
        if(error) return res.status(400).json({message: error})

        this.MatchService.rateUser(rateUserDto!)
            .then((data) => res.status(200).json(data))
            .catch((error) => handleError(error, res))
    }
}