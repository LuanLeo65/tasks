import {Request, Response, NextFunction} from 'express';
import { ReqParamNotFoundError } from './ReqParamNotFoundError';
import { ForbidenError } from './ForbidenError';
import { NotFoundError } from './NotFoundError';
import { PayloadNotFoundError } from './PayloadNotFoundError';
import { UnauthorizedError } from './UnauthorizedError';
import { InvalidPayloadError } from './InvalidPayloadError';

export default function errorsMiddleware(error: Error, req: Request, res: Response, next: NextFunction) { 
    console.error(error);
    

    if(error instanceof ReqParamNotFoundError){
        return res.status(400).json({ param: error.param, error: error.message });
    } 
    else if(error instanceof ForbidenError){
        return res.status(403).json({ error: error.message });
    }
    else if (error instanceof NotFoundError){
        return res.status(404).json({ error: error.message });
    }
    else if (error instanceof PayloadNotFoundError){
        return res.status(400).json({ error: error.message });
    }else if (error instanceof UnauthorizedError){
        return res.status(401).json({ error: error.message });
    }else if (error instanceof InvalidPayloadError){
        return res.status(422).json({ error: error.message });
    }



    res.sendStatus(500)

}
