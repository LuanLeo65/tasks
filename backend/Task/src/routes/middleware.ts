import { Request, Response } from "express";
import commentSchema from "../model/comments/commentsSchema";
import taskSchema from "../model/task/taskSchema";
import auth from "../auth";

function validateTask(req: Request, res: Response, next: any) {
  return auth.validateSchemas(taskSchema, req, res, next);
}

function validateComments(req: Request, res: Response, next: any) {
  return auth.validateSchemas(commentSchema, req, res, next);
}

function validateAuthentication(req: Request, res: Response, next: any) {
  return auth.verifyJWT(req, res, next);
}

export default { validateComments, validateTask, validateAuthentication };
