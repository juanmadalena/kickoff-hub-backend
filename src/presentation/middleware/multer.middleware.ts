import multer, { memoryStorage } from 'multer'

export class MulterMiddleware{

    static multer = multer({
        storage: memoryStorage(),
        limits: {
            fileSize: 5 * 1024 * 1024,
            files: 1,
        },
    }).single('image')

}