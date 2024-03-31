export class PlayersToRateDto {
    private constructor(
        public readonly idMatch: string,
        public readonly idUser: string,
    ) {}

    static create(props: { [key: string]: any }): [string?, PlayersToRateDto?] {
        const { idMatch, idUser } = props

        // Id Match
        if (!idMatch) return ['Id Match is required']

        // Id User
        if (!idUser) return ['Id User is required']

        return [undefined, new PlayersToRateDto(idMatch, idUser)]
    }
}