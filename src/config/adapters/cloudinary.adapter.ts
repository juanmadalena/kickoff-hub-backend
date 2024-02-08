import { v2 as cloudinary } from 'cloudinary';
import { envs } from '../envs';

interface uploadProps {
    file: Buffer
    name: string
    transformation?: { width: number, height: number, quality: string }
    folder?: string
}

cloudinary.config({
    cloud_name: envs.CLOUDINARY_CLOUD_NAME,
    api_key: envs.CLOUDINARY_API_KEY,
    api_secret: envs.CLOUDINARY_API_SECRET,
    secure: true
})

export const cloudinaryAdapter =  {
    
    upload( props: uploadProps ): Promise<string|null>{
        const { file, name, transformation = { width: 600, quality: 70 }, folder = 'KickoffHub/profilePictures' } = props
        
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image', folder, public_id: name, transformation, allowed_formats: [ 'png', 'png', 'jpg' ], overwrite: true }, (error, result) => {
                if( error ) return reject(error)
                resolve(result?.secure_url || null)
            })
            .end(file)
            
        })
    }
}