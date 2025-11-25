import { HttpError } from "./HttpError";
import { Response } from "express";

export class UnauthorizedError extends HttpError {
    constructor(message: string) {
        super(401, message);
    }

    configResponse(response: Response): Response {
        return response.status(this.statusCode).json({
            error: this.message,
        });
    }
}