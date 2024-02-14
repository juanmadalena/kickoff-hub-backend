import { Position } from '../../../config';
export class JoinMatchDto {
    private constructor(
        public readonly idMatch: string,
        public readonly idUser: string,
        public readonly position: Position
    ) { }

    static create(props: { [key: string]: any }): [string?, JoinMatchDto?] {
        const { idMatch, idUser, position } = props

        // Id Match
        if (!idMatch) return ['Id Match is required']

        // Id User
        if (!idUser) return ['Id User is required']

        // Position
        if (!position) return ['Position is required']

        return [undefined, new JoinMatchDto(idMatch, idUser, position)]
    }
}