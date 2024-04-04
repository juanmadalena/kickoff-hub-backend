export class RateUserDto {

    private constructor(
        public readonly rate: number,
        public readonly idMatch: string,
        public readonly idUser: string,
        public readonly idUserRated: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, RateUserDto?] {
        const { rate, idMatch, idUser, idUserRated } = props

        // Rate
        if (!rate) return ['Rate is required']
        if(rate > 5) return ['Rate must be less than or equal to 5']
        if(rate < 1) return ['Rate must be greater than or equal to 1']

        // Id Match
        if (!idMatch) return ['Id Match is required']

        // Id User
        if (!idUser) return ['Id User is required']

        // Id User Rated
        if (!idUserRated) return ['Id User Rated is required']

        return [undefined, new RateUserDto(rate, idMatch, idUser, idUserRated)]
    }

}