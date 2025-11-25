import { Response } from "express";
import { HttpError } from "./HttpError";

export class NotFoundError extends HttpError {
    constructor(message: string) {
        super(404, message);
    } 

    configResponse(response: Response): Response {
        return response.status(this.statusCode).json({
            error: this.message,
        });
    }
}