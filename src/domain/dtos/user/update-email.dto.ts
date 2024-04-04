import { regularExps } from "../../../config";

export class UpdateUserEmailDto {

    private constructor(
        public readonly idUser: string,
        public readonly email?: string,
    ) {}

    static create(props: { [key: string]: any }): [string?, UpdateUserEmailDto?] {
        const { idUser, email } = props

        // Id
        if (!idUser) return ['Id is required']

        // Email
        if (email && !regularExps.email.test(email)) return ['Invalid email']

        return [undefined, new UpdateUserEmailDto(idUser, email)]
    }

}