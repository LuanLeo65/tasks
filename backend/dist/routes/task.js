"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//routes/task.ts
const express_1 = require("express");
const task_1 = __importDefault(require("../controller/task"));
const comments_1 = __importDefault(require("../controller/comments"));
const middleware_1 = __importDefault(require("./middleware"));
const router = (0, express_1.Router)();
router.get("/task", task_1.default.getTasks);
router.get("/task/comments", comments_1.default.getAllComments);
router.get('/task/all/:id', task_1.default.getTaskComments);
router.get("/task/:id", task_1.default.getTask);
router.post("/task", middleware_1.default.validateTask, task_1.default.addTask);
router.patch("/task/:id", middleware_1.default.validateTask, task_1.default.setTask);
router.delete("/task/:id", task_1.default.deleteTask);
router.get("/task/:taskId/comments", comments_1.default.getCommentsOfTask);
router.post("/task/:taskId/comments", middleware_1.default.validateComments, comments_1.default.addComment);
exports.default = router;
