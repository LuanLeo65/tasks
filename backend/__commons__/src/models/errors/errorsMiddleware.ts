import {Request, Response, NextFunction} from 'express';
import { HttpError } from './HttpError';

export default function errorsMiddleware(error: Error, req: Request, res: Response, next: NextFunction) { 
    console.error(error);
    
    if(error instanceof HttpError){
        return error.configResponse(res)
    } 
    
    res.sendStatus(500)

}
