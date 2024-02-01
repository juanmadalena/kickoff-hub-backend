export class CustomErrors extends Error{

    private constructor(
        public readonly statusCode: number,
        public readonly message: string,
        public readonly input?: string
    ){
        super(message)
    }

    static badRequest(message: string, input?: string){
        return new CustomErrors(400, message, input)
    }

    static unauthorized(message: string){
        return new CustomErrors(401, message)
    }

    static forbidden(message: string){
        return new CustomErrors(403, message)
    }

    static notFound(message: string){
        return new CustomErrors(404, message)
    }

    static internalServerError(message: string){
        return new CustomErrors(500, message)
    }

}