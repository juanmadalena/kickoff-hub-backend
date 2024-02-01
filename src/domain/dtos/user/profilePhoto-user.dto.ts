
export class ProfilePhotoUserDto{
    private constructor(
        public readonly id: string,
        public readonly photo?: Blob,
    ){}

    
    static create(props: {[key:string]:any}): [string?, ProfilePhotoUserDto?] {
        
        const {id, photo = null } = props
        
        // Username
        if(!id) return ['Id is required']
        
        return [undefined, new ProfilePhotoUserDto(id, photo)]
    }
}