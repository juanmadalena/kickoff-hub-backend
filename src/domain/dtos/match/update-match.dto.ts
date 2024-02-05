export class UpdateMatchDto{
    private constructor(
        public readonly id: string,
        public readonly date: Date,
        public readonly time: string,
        public readonly duration: string,
        public readonly description: string,
        public readonly location: string,
        public readonly latitude: number,
        public readonly longitude: number,
        public readonly minPlayers: number,
        public readonly maxPlayers: number,
        public readonly price: number,
        public readonly isPrivate: boolean,
    ){}

    
    static create(props: {[key:string]:any}): [string?, UpdateMatchDto?] {
        
        const { id, date, time, duration, description, location, latitude, longitude, minPlayers, maxPlayers, price, isPrivate = false } = props

        //id
        if(!id) return ['Id is required']

        // Date
        if(!date) return ['Date is required']

        // Time
        if(!time) return ['Time is required']

        // Description
        if(!description) return ['Description is required']

        // Location
        if(!location) return ['Location is required']

        // Latitude
        if(!latitude) return ['Latitude is required']

        // Longitude
        if(!longitude) return ['Longitude is required']

        // Min Players
        if(!minPlayers) return ['Min Players is required']

        // Max Players
        if(!maxPlayers) return ['Max Players is required']

        // Price
        if(!price) return ['Price is required']

        return [undefined, new UpdateMatchDto(id, date, time, duration, description, location, latitude, longitude, minPlayers, maxPlayers, price, isPrivate)]
    }
}