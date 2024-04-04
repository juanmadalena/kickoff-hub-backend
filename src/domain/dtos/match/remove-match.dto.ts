export class RemoveMatchDto {
    private constructor(
        public readonly idMatch: string,
        public readonly idUser: string,
        public readonly idUserToRemove: string
    ) {}

    static create(props: { [key: string]: any }): [string?, RemoveMatchDto?] {
        const { idMatch, idUser, idUserToRemove } = props

        // Id Match
        if (!idMatch) return ['Match is required']

        // Id User
        if (!idUser) return ['Id User is required']

        // Id User to remove
        if (!idUserToRemove) return ['User to remove is required']

        return [undefined, new RemoveMatchDto(idMatch, idUser, idUserToRemove)]
    }
}