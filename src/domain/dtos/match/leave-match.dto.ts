export class LeaveMatchDto {
    private constructor(
        public readonly idMatch: string,
        public readonly idUser: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, LeaveMatchDto?] {
        const { idMatch, idUser } = props

        // Id Match
        if (!idMatch) return ['Id Match is required']

        // Id User
        if (!idUser) return ['Id User is required']

        return [undefined, new LeaveMatchDto(idMatch, idUser)]
    }
}