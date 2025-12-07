//controller/comments.ts
import { Response, Request } from "express";
import commentRepository from "../model/comments/commentsRepository";
import { IComments } from "src/model/comments/comments";
import { ReqParamNotFoundError } from "commons/models/errors/ReqParamNotFoundError";
import { PayloadNotFoundError } from "commons/models/errors/PayloadNotFoundError";
import { NotFoundError } from "commons/models/errors/NotFoundError";
import { UnauthorizedError } from "commons/models/errors/UnauthorizedError";

async function getAllComments(req: Request, res: Response, next: any) {
    const comments = await commentRepository.findAll();
    if (comments.length === 0 || !comments) return next(new NotFoundError("Nenhum comentario encontrado"));

    return res.status(200).json(comments);
}

async function getAllUserComments(req: Request, res: Response, next: any) {
    const userId = parseInt(req.params.userId);
    if (!userId) return next(new ReqParamNotFoundError("userId", "Id invalido"));

    const userComments = await commentRepository.findByUser(userId);
    if (userComments.length === 0 || !userComments) return next(new NotFoundError("Nenhum comentario encontrado para este usuario"));

    return res.status(200).json(userComments);
}

async function getCommentsOfTask(req: Request, res: Response, next: any) {
    const id = parseInt(req.params.taskId);
    if (!id) return next(new ReqParamNotFoundError("taskId", "Id invalido"));

    const commentsTask = await commentRepository.findAllbyTask(id);
    if (commentsTask.length === 0 || !commentsTask) return next(new NotFoundError("Nenhum comentario encontrado para esta task"));

    return res.status(200).json(commentsTask);
}

async function addComment(req: Request, res: Response, next: any) {
    const id = parseInt(req.params.taskId);
    if (!id) return next(new ReqParamNotFoundError("taskId", "Id invalido"));

    const { userId } = res.locals.payload;
    if (!userId) return next(new UnauthorizedError("Usuario nao autorizado"));

    const { name } = res.locals.payload;
    if (!name) return next(new UnauthorizedError("Usuario nao autorizado"));

    const commentsParams = req.body;
    if (!commentsParams) return next(new PayloadNotFoundError("Preencha os campos corretamente"));

    commentsParams.userId = userId;
    commentsParams.author = name;

    const comment = await commentRepository.addComment(id, commentsParams);
    console.log(comment);

    return res.status(201).json(comment);
}

async function deleteComment(req: Request, res: Response, next: any) {
    const id = parseInt(req.params.id);
    if (!id) return next(new ReqParamNotFoundError("id", "Id invalido"));

    await commentRepository.deleteComment(id);

    return res.sendStatus(204);
}

async function setComment(req: Request, res: Response, next: any) {
    const id = parseInt(req.params.id);
    if (!id) return next(new ReqParamNotFoundError("id", "Id invalido"));

    const commentsParams = req.body as IComments;
    if (!commentsParams) return next(new PayloadNotFoundError("Preencha os campos corretamente"));

    const commentUpdated = await commentRepository.setComment(
      id,
      commentsParams
    );

    if (commentUpdated === null) return next(new NotFoundError("Comentario nao encontrado"));
    
    return res.status(201).json(commentUpdated);
}

export default {
  addComment,
  getCommentsOfTask,
  getAllComments,
  deleteComment,
  setComment,
  getAllUserComments,
};
