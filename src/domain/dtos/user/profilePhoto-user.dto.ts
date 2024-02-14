import { CustomError } from "../../../config"

export class ProfilePhotoUserDto{
    private constructor(
        public readonly id: string,
        public readonly photo?: Blob,
    ){}

    
    static create(props: {[key:string]:any}): [CustomError?, ProfilePhotoUserDto?] {
        
        const {id, photo = null } = props
        
        if(!id) return [{message: 'Id is required'}]
        
        return [undefined, new ProfilePhotoUserDto(id, photo)]
    }
}