//controller/task.ts
import { Response, Request } from "express";
import { ITask } from "../model/task/task";
import repository from "../model/task/taskRepository";
import { ReqParamNotFoundError } from "commons/models/errors/ReqParamNotFoundError";
import { PayloadNotFoundError } from "commons/models/errors/PayloadNotFoundError";
import { NotFoundError } from "commons/models/errors/NotFoundError";
import { UnauthorizedError } from "commons/models/errors/UnauthorizedError";

async function getTasks(req: Request, res: Response, next: any) {
    const allTasks = await repository.findAll();
    if (!allTasks || allTasks.length === 0) return next(new PayloadNotFoundError('Nenhuma task encontrada'));
    return res.status(200).json(allTasks);
}

async function getUserTasks(req: Request, res: Response, next: any) {
    const userId = parseInt(req.params.userId);
    if (!userId) return next(new ReqParamNotFoundError("userId", "Id invalido"));

    const allUserTasks = await repository.findByUser(userId);
    if (!allUserTasks || allUserTasks.length === 0) return next(new PayloadNotFoundError('Nenhuma task encontrada para este usuario'));

    return res.status(200).json(allUserTasks);
}

async function getTaskComments(req: Request, res: Response, next: any) {
    const id = parseInt(req.params.id);
    if (!id) return next(new ReqParamNotFoundError("id", "Id invalido"));

    const taskComments = await repository.findByTask(id);
    if (taskComments === null) return next(new NotFoundError("Task nao encontrada"));

    return res.status(200).json(taskComments);

}

async function getTask(req: Request, res: Response, next: any) {
    const id = parseInt(req.params.id);
    if (!id) return next(new ReqParamNotFoundError("id", "Id invalido"));

    const task = await repository.findById(id);

    if (task === null) {
     return next(new NotFoundError("Task nao encontrada"));
    } else {
      return res.status(200).json(task);
    }
}

async function addTask(req: Request, res: Response, next: any) {
    const { userId } = res.locals.payload;
    if (!userId) return next(new UnauthorizedError("Usuario nao autorizado"));

    const { name } = res.locals.payload;
    if (!name) return next(new UnauthorizedError("Usuario nao autorizado"));

    const taskInfo = req.body as ITask;
    if (!taskInfo) return next(new PayloadNotFoundError('Preencha os campos corretamente'));

    taskInfo.userId = userId;
    taskInfo.author = name;

    const taskCreated = await repository.create(taskInfo);

    return res.status(201).json(taskCreated);
}

async function setTask(req: Request, res: Response, next: any) {
    const id = parseInt(req.params.id);
    if (!id) return next(new ReqParamNotFoundError("id", "Id invalido"));

    const taskParams = req.body as ITask;
    if (!taskParams) return next(new PayloadNotFoundError('Preencha os campos corretamente'));

    const taskUpdated = await repository.set(id, taskParams);

    if (taskUpdated === null) return next(new NotFoundError("Task nao encontrada"));

    return res.status(200).json(taskUpdated);
}

async function deleteTask(req: Request, res: Response, next: any) {
    const id = parseInt(req.params.id);
    if (!id) return next(new ReqParamNotFoundError("id", "Id invalido"));

    await repository.deleteById(id);

    return res.sendStatus(204);
}

export default {
  getTasks,
  addTask,
  getTask,
  setTask,
  deleteTask,
  getTaskComments,
  getUserTasks,
};
