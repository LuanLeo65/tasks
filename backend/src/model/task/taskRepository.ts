//model/taskRepository.ts
import Task, { ITaskModel } from "./taskModel";
import { ITask } from "./task";
import Comment from "../comments/commentsModel";

async function findAll() {
  const tasks = await Task.findAll();
  return tasks;
}

async function findByTask(id:number) {
  const task = await Task.findByPk(id, { include: [{model: Comment, as: 'comments'}]})
  return task

}

async function findById(id: number) {
    const task = await Task.findOne({where: {id: id}})
    
    return task
}

async function create(task: ITask) {
  const createTask = await Task.create(task);
  return createTask;
}

async function set(id:number, task: ITask){
    const originalTask = await Task.findByPk<ITaskModel>(id)
    if(originalTask !== null){
        if(task.title) originalTask.title = task.title

        if(task.description) originalTask.description = task.description

        if(task.status) originalTask.status = task.status

        await originalTask.save()

        return originalTask
    }
    return null
}

async function deleteById(id: number) {
    return await Task.destroy({where: {id: id}})
}

export default { findAll, create, findById, set, deleteById, findByTask };
