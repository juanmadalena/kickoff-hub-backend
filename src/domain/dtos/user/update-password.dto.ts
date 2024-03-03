
export class UpdateUserPasswordDto {

    private constructor(
        public readonly id: string,
        public readonly oldPassword: string,
        public readonly newPassword: string
    ) { }


    static create(props: { [key: string]: any }): [string?, UpdateUserPasswordDto?] {
        const { id, oldPassword, newPassword } = props

        // Id
        if (!id) return ['Id is required']

        // Old Password
        if (!oldPassword) return ['Old password is required']

        // New Password
        if (!newPassword) return ['New password is required']


        return [undefined, new UpdateUserPasswordDto(id, oldPassword, newPassword)]
    }

}