import { UserEntity } from "./user.entity";

export class MatchEntity{

    constructor(
        public readonly id: string,
        public readonly date: Date,
        public readonly time: string,
        public readonly duration: string,
        public readonly location: string,
        public readonly address: string,
        public readonly price: number,
        public readonly num_players: number,
        public readonly min_players: number,
        public readonly max_players: number,
        public readonly organizer?: UserEntity,
        public readonly description?: string,
        public readonly latitude?: number,
        public readonly longitude?: number,
        public readonly is_private?: boolean,
        public readonly is_canceled?: boolean,
        public readonly players?: UserEntity[],
    ){}

    public static getMatchesFromObject(object: {[key: string]: any}): MatchEntity{
        const { id, date, duration, time, description, location, address, latitude, longitude, num_players, min_players, max_players, price, is_private, is_canceled, players, id_organizer } = object
        
        const offset = new Date().getTimezoneOffset()
        date.setMinutes(date.getMinutes() - offset)
        
        // If organizer is provided, create a new UserEntity
        const organizerEntity = id_organizer && UserEntity.getOrganizerFromObject(object)

        const playersEntityArray = players?.map(UserEntity.getUserFromObject)

        return new MatchEntity(id, date, time, duration, location, address, price, num_players, min_players, max_players, organizerEntity, description, latitude, longitude, is_private, is_canceled, playersEntityArray)
    }
}