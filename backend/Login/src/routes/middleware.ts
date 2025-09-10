import { Request, Response } from "express";
import { accountSchema, accountUpdateSchema } from "../model/accountsSchema";
import auth from "../auth";


function validateAccountSchema(req:Request, res: Response, next: any) {
    return auth.validateSchema(accountSchema, req, res, next)
}

function validateAccountUpdateSchema(req:Request, res: Response, next: any) {
    return auth.validateSchema(accountUpdateSchema, req, res, next)

}


export default { validateAccountSchema, validateAccountUpdateSchema }