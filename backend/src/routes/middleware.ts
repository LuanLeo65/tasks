import { Request, Response } from "express";
import commentSchema from "../model/comments/commentsSchema";
import taskSchema from "../model/task/taskSchema";

function validateTask(req: Request, res: Response, next: any) {
  const { error } = taskSchema.validate(req.body);

  if (error == null) return next();

  const { details } = error;
  const message = details.map((item) => item.message).join(",");

  console.log(`validateTask: ${message}`);
  return res.status(422).json({
    error: req.body,
    message,
  });
}


function validateComments(req: Request, res: Response, next: any) {
    const { error } = commentSchema.validate(req.body)
    
    if(error == null) return next()

    const {details} = error
    const message = details.map((item) => item.message).join(',')

    console.log(`validateComments: ${message}`)
    return res.status(422).json({
        error: req.body,
        message
    })
}

export default {validateComments, validateTask}