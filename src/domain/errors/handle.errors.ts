import { CustomErrors } from "./custom.errors";
import { Response } from "express";

export const handleError = (error: unknown, res: Response ) => {
    if ( error instanceof CustomErrors ) {
      return res.status(error.statusCode).json({ error: error.message, input: error.input});
    }

    return res.status(500).json({ error: 'Internal server error' })
} 