//routes/task.ts
import { Router } from "express";
import taskController from "../controller/task";
import commentsController from "../controller/comments";
import schemas from './middleware'

const router = Router();


router.get("/task",taskController.getTasks);

router.get("/task/comments", commentsController.getAllComments);

router.get('/task/details/:id', taskController.getTaskComments)

router.get("/task/:id", taskController.getTask);

router.post("/task",schemas.validateTask, taskController.addTask);

router.patch("/task/:id",schemas.validateTask ,taskController.setTask);

router.delete("/task/:id", taskController.deleteTask);

router.get("/task/:taskId/comments", commentsController.getCommentsOfTask);

router.post("/task/:taskId/comments",schemas.validateComments ,commentsController.addComment);

router.patch("/task/:id/comments", schemas.validateComments, commentsController.setComment)

router.delete("/task/comments/:id", commentsController.deleteComment)

export default router;
