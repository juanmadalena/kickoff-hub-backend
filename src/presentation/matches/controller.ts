import { Request, Response } from "express";
import { MatchService } from "../services/match.service";
import { CreateMatchDto, UpdateMatchDto, handleError, JoinMatchDto, CancelMatchDto } from "../../domain";

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

    //Get all players by match
    getPlayersByMatch = (req: Request, res: Response) => {

        const id: string = req.params.id

        this.MatchService.getPlayersByMatch( id )
            .then((data) => res.status(200).json(data))
            .catch((error) => handleError(error, res))

    }

    createMatch = (req: Request, res: Response) => {
        const [error, newMatch] = CreateMatchDto.create(req.body)

        if(error){
            return res.status(400).json({message: error})
        }

        this.MatchService.createMatch(newMatch!)
            .then((data) => res.status(201).json(data))
            .catch((error) => handleError(error, res))
    }

    updateMatch = (req: Request, res: Response) => {
        const [error, updateMatch] = UpdateMatchDto.create(req.body)

        if(error){
            return res.status(400).json({message: error})
        }

        this.MatchService.updateMatch(updateMatch!)
            .then((data) => res.status(200).json(data))
            .catch((error) => handleError(error, res))
    }

    joinMatch = (req: Request, res: Response) => {
        const [error, joinMatchDto] = JoinMatchDto.create(req.body)

        if(error) return res.status(400).json({message: error})

        this.MatchService.joinMatch(joinMatchDto!)
            .then((data) => res.status(200).json(data))
            .catch((error) => handleError(error, res))
    }

    cancelMatch = (req: Request, res: Response) => {
        const [ error, cancelMatchDto ] = CancelMatchDto.create(req.body)

        if(error) return res.status(400).json({message: error})

        this.MatchService.cancelMatch(cancelMatchDto!)
            .then((data) => res.status(200).json(data))
            .catch((error) => handleError(error, res))
    }
}