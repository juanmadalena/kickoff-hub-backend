import { UserEntity } from "./user.entity";

export class MatchEntity{

    constructor(
        public readonly id: string,
        public readonly organizer: UserEntity,
        public readonly date: Date,
        public readonly time: string,
        public readonly description: string,
        public readonly location: string,
        public readonly latitude: number,
        public readonly longitude: number,
        public readonly price: number,
        public readonly num_players: number,
        public readonly min_players: number,
        public readonly max_players: number,
    ){}

    public static getMatchesFromObject(object: {[key: string]: any}): MatchEntity{
        const { id, date, time, description, location, latitude, longitude, num_players, min_players, max_players, price } = object

        const organizerEntity = UserEntity.getOrganizerFromObject(object)

        return new MatchEntity(id, organizerEntity, date, time, description, location, latitude, longitude, price, num_players, min_players, max_players)
    }
}