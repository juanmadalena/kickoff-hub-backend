import { UserEntity } from "./user.entity";

export class MatchEntity{

    constructor(
        public readonly id: string,
        public readonly organizer: UserEntity,
        public readonly date: Date,
        public readonly time: string,
        public readonly duration: string,
        public readonly location: string,
        public readonly price: number,
        public readonly num_players: number,
        public readonly min_players: number,
        public readonly max_players: number,
        public readonly description?: string,
        public readonly latitude?: number,
        public readonly longitude?: number,
        public readonly is_private?: boolean,
        public readonly is_canceled?: boolean,
        public readonly players?: UserEntity[],
    ){}

    public static getMatchesFromObject(object: {[key: string]: any}): MatchEntity{
        const { id, date, duration, time, description, location, latitude, longitude, num_players, min_players, max_players, price, is_private, is_canceled, players } = object

        const organizerEntity = UserEntity.getOrganizerFromObject(object)
        const playersEntityArray = players?.map(UserEntity.getUserFromObject)

        return new MatchEntity(id, organizerEntity, date, time, duration, location, price, num_players, min_players, max_players, description, latitude, longitude, is_private, is_canceled, playersEntityArray)
    }
}