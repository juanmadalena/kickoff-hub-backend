import { regularExps } from "../../../config";

export class UpdateUserEmailDto {

    private constructor(
        public readonly id: string,
        public readonly email?: string,
    ) {}

    static create(props: { [key: string]: any }): [string?, UpdateUserEmailDto?] {
        const { id, email } = props

        // Id
        if (!id) return ['Id is required']

        // Email
        if (email && !regularExps.email.test(email)) return ['Invalid email']

        return [undefined, new UpdateUserEmailDto(id, email)]
    }

}