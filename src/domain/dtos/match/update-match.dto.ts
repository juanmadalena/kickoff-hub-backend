export class UpdateMatchDto{
    private constructor(
        public readonly id: string,
        public readonly duration: string,
        public readonly description: string,
        public readonly minPlayers: number,
        public readonly maxPlayers: number,
        // public readonly price: number,
        // public readonly isPrivate: boolean,
    ){}

    
    static create(props: {[key:string]:any}): [string?, UpdateMatchDto?] {
        
        const { id, duration, description, minPlayers, maxPlayers } = props

        //id
        if(!id) return ['Id is required']

        // Description
        if(!description) return ['Description is required']

        // Min Players
        if(!minPlayers) return ['Min Players is required']

        // Max Players
        if(!maxPlayers) return ['Max Players is required']

        // Duration
        if(!duration) return ['Duration is required']

        return [undefined, new UpdateMatchDto( id, duration, description, minPlayers, maxPlayers )]
    }
}