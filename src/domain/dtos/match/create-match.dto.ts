import { CustomError } from "../../../config"
import { checkDate } from "../../../utils/checkDate"

export class CreateMatchDto{
    private constructor(
        public readonly date: Date | String,
        public readonly time: string,
        public readonly duration: string,
        public readonly description: string,
        public readonly location: string,
        public readonly address: string,
        public readonly idAddress: string,
        public readonly minPlayers: number,
        public readonly maxPlayers: number,
        // public readonly price: number,
        public readonly idOrganizer: string,
        public readonly isPrivate: boolean,
    ){}

    
    static create(props: {[key:string]:any}): [CustomError?, CreateMatchDto?] {
        
        const { date, time, duration, description, location, address, idAddress, minPlayers, maxPlayers, idOrganizer, isPrivate = false } = props

        // Date
        if(!date) return [{message:'Date is required', input:'date'}]

        // Time
        if(!time) return [{message:'Time is required', input:'time'}]

        // Duration
        if(!duration) return [{message:'Duration is required', input:'duration'}]

        // Description
        // if(!description) return ['Description is required']

        // Location
        if(!location) return [{message:'Location is require', input:'location'}]

        //address
        if(!address) return [{message:'Location is incorrect', input:'location'}]

        // Id Address
        if(!idAddress) return [{message:'Location is incorrect', input:'location'}]

        // Min Players
        if(!minPlayers) return [{message:'Min players is required', input:'minPlayers'}]

        // Max Players
        if(!maxPlayers) return [{message:'Max players is required', input:'maxPlayers'}]

        if(minPlayers > maxPlayers) return [{message:'Min players must be less than max players', input:'minPlayers'}]

        // Price
        // if(!price) return ['Price is required']

        // Id Organizer
        if(!idOrganizer) return [{message:'Id organizer is required', input:'organizer'}]

        if(!checkDate(date, time)) return [{message:'Match is in the past', input:'date'}]

        return [undefined, new CreateMatchDto(date, time, duration, description, location, address, idAddress, minPlayers, maxPlayers, idOrganizer, isPrivate)]
    }
}