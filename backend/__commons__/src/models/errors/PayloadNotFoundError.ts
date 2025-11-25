import { HttpError } from "./HttpError";
import { Response } from "express";

export class PayloadNotFoundError extends HttpError {
    constructor(message: string) {
        super(400, message);
    } 

    configResponse(response: Response): Response {
        return response.status(this.statusCode).json({
            error: this.message,
        });
    }
}