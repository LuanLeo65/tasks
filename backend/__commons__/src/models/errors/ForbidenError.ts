import { HttpError } from './HttpError';
import { Response } from 'express';

export class ForbidenError extends HttpError {
    constructor(message: string) {
        super(403, message);
    }

    configResponse(response: Response): Response {
        return response.status(this.statusCode).json({
            error: this.message,
        });
    }
}