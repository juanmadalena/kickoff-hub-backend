import { checkDate } from "../../../utils/checkDate"

export class CreateMatchDto{
    private constructor(
        public readonly date: Date,
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

    
    static create(props: {[key:string]:any}): [string?, CreateMatchDto?] {
        
        const { date, time, duration, description, location, address, idAddress, minPlayers, maxPlayers, idOrganizer, isPrivate = false } = props
        // console.log('props', props)
        // Date
        if(!date) return ['Date is required']

        // Time
        if(!time) return ['Time is required']

        // Duration
        if(!duration) return ['Duration is required']

        // Description
        // if(!description) return ['Description is required']

        // Location
        if(!location) return ['Location is required']

        //address
        if(!address) return ['Address is required']

        // Id Address
        if(!idAddress) return ['Id Address is required']

        // Min Players
        if(!minPlayers) return ['Min Players is required']

        // Max Players
        if(!maxPlayers) return ['Max Players is required']

        // Price
        // if(!price) return ['Price is required']

        // Id Organizer
        if(!idOrganizer) return ['Id Organizer is required']

        if(checkDate(date, time)) return ['Invalid date or time']

        return [undefined, new CreateMatchDto(date, time, duration, description, location, address, idAddress, minPlayers, maxPlayers, idOrganizer, isPrivate)]
    }
}