import { HttpError } from "./HttpError";
import { Response } from "express";

export class InvalidPayloadError extends HttpError {
    constructor(message: string) {
        super(422, message);
    }

    configResponse(response: Response): Response {
        return response.status(this.statusCode).json({
            error: this.message,
        });
    }
}