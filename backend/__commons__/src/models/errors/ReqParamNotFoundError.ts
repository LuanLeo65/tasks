import { HttpError } from "./HttpError";
import { Response } from "express";

export class ReqParamNotFoundError extends HttpError {
    param: string;
    constructor(param: string, message: string) {
        super(400, message);
        this.param = param;
    }
    configResponse(response: Response): Response {
        return response.status(this.statusCode).json({
            error: this.message,
            param: this.param,
        }); 
    }
}