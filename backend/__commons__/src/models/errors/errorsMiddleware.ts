import {Request, Response, NextFunction} from 'express';

export default function errorsMiddleware(error: Error, req: Request, res: Response, next: NextFunction) { 
    console.error(error);
    res.sendStatus(500)

}
