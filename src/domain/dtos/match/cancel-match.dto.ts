export class CancelMatchDto {
    private constructor(
        public readonly idMatch: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, CancelMatchDto?] {
        const { idMatch, idUser } = props

        // Id Match
        if (!idMatch) return ['Id Match is required']

        return [undefined, new CancelMatchDto(idMatch)]
    }
}