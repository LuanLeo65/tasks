import { Request, Response } from "express";
import {
  accountSchema,
  accountUpdateSchema,
  accountLoginSchema,
} from "../model/account/accountsSchema";
import auth from "../auth";

function validateAccountSchema(req: Request, res: Response, next: any) {
  return auth.validateSchema(accountSchema, req, res, next);
}

function validateAccountUpdateSchema(req: Request, res: Response, next: any) {
  return auth.validateSchema(accountUpdateSchema, req, res, next);
}

function validateAccountLoginSchema(req: Request, res: Response, next: any) {
  return auth.validateSchema(accountLoginSchema, req, res, next);
}

function validateAuthentication(req: Request, res: Response, next: any) {
  return auth.verifyJWT(req, res, next);
}

export default {
  validateAccountSchema,
  validateAccountUpdateSchema,
  validateAccountLoginSchema,
  validateAuthentication,
};
