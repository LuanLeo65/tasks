//routes/task.ts
import { Router } from "express";
import taskController from "../controller/task";
import commentsController from "../controller/comments";
import middlewares from './middleware'

const router = Router();


router.get("/task",middlewares.validateAuthentication, taskController.getTasks);

router.get("/task/comments",middlewares.validateAuthentication, commentsController.getAllComments);

router.get('/task/details/:id',middlewares.validateAuthentication, taskController.getTaskComments)

router.get("/task/:id",middlewares.validateAuthentication, taskController.getTask);

router.post("/task",middlewares.validateAuthentication, middlewares.validateTask, taskController.addTask);

router.patch("/task/:id",middlewares.validateAuthentication, middlewares.validateTask ,taskController.setTask);

router.delete("/task/:id",middlewares.validateAuthentication,  taskController.deleteTask);

router.get("/task/:taskId/comments",middlewares.validateAuthentication,  commentsController.getCommentsOfTask);

router.post("/task/:taskId/comments",middlewares.validateAuthentication, middlewares.validateComments ,commentsController.addComment);

router.patch("/task/:id/comments",middlewares.validateAuthentication,  middlewares.validateComments, commentsController.setComment)

router.delete("/task/comments/:id",middlewares.validateAuthentication, commentsController.deleteComment)

export default router;
