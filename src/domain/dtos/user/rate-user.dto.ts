export class RateUserDto {

    private constructor(
        public readonly rate?: number,
        public readonly idMatch?: string,
        public readonly idUser?: string,
        public readonly idUserRated?: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, RateUserDto?] {
        const { rate, idMatch, idUser, idUserRated } = props

        // Rate
        if (!rate) return ['Rate is required']

        // Id Match
        if (!idMatch) return ['Id Match is required']

        // Id User
        if (!idUser) return ['Id User is required']

        // Id User Rated
        if (!idUserRated) return ['Id User Rated is required']

        return [undefined, new RateUserDto(rate, idMatch, idUser, idUserRated)]
    }

}