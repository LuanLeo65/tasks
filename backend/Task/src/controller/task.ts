//controller/task.ts
import { Response, Request } from "express";
import { ITask } from "../model/task/task";
import repository from "../model/task/taskRepository";

async function getTasks(req: Request, res: Response, next: any) {
  try {
    const allTasks = await repository.findAll();
    if (!allTasks || allTasks.length === 0) {
      res
        .status(400)
        .json({ erro: "Nao foi possivel encontrar nada no banco de dados" });
      return;
    }
    return res.status(200).json(allTasks);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ erro: "Ocorreu um erro ao retornar todas as tasks" });
  }
}

async function getTaskComments(req: Request, res: Response, next: any) {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      res.status(400).json({ erro: "Id invalido" });
      return;
    }

    const taskComments = await repository.findByTask(id);
    if (taskComments === null) {
      return res.status(404).json({ erro: "Task nao encontrada" });
    }
    return res.status(200).json(taskComments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: "Ocorreu um erro ao procurar a tasks" });
  }
}

async function getTask(req: Request, res: Response, next: any) {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      res.status(400).json({ erro: "Id invalido" });
      return;
    }

    const task = await repository.findById(id);

    if (task === null) {
      return res.status(404).json({ erro: "Task nao encontrada" });
    } else {
      return res.status(200).json(task);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: "Ocorreu um erro ao procurar a tasks" });
  }
}
async function addTask(req: Request, res: Response, next: any) {
  try {
    const { userId } = res.locals.payload;
    if (!userId) return res.sendStatus(401);

    const { name } = res.locals.payload;
    if (!name) return res.sendStatus(401);

    const taskInfo = req.body as ITask;
    if (!taskInfo) {
      res.status(400).json({ erro: "Nao foi possivel criar a conta" });
      return;
    }

    taskInfo.userId = userId;
    taskInfo.author = name;

    const taskCreated = await repository.create(taskInfo);

    return res.status(201).json(taskCreated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: "Ocorreu um erro ao criar task" });
  }
}

async function setTask(req: Request, res: Response, next: any) {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      res.status(400).json({ erro: "Id invalido" });
      return;
    }

    const taskParams = req.body as ITask;
    if (!taskParams) {
      res.status(400).json({ erro: "Nao foi possivel atualizar a conta" });
      return;
    }

    const taskUpdated = await repository.set(id, taskParams);

    if (taskUpdated === null) {
      return res.status(404).json({ erro: "Task nao encontrada" });
    }

    return res.status(200).json(taskUpdated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: "Ocorreu um erro ao atualizar a task" });
  }
}

async function deleteTask(req: Request, res: Response, next: any) {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      res.status(400).json({ erro: "Id invalido" });
      return;
    }

    await repository.deleteById(id);

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: "Ocorreu um erro ao deletar a task" });
  }
}

export default {
  getTasks,
  addTask,
  getTask,
  setTask,
  deleteTask,
  getTaskComments,
};
