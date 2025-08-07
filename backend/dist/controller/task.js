"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskRepository_1 = __importDefault(require("../model/task/taskRepository"));
function getTasks(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allTasks = yield taskRepository_1.default.findAll();
            if (!allTasks || allTasks.length === 0) {
                res
                    .status(400)
                    .json({ erro: "Nao foi possivel encontrar nada no banco de dados" });
                return;
            }
            return res.status(200).json(allTasks);
        }
        catch (error) {
            console.log(error);
            res
                .status(500)
                .json({ erro: "Ocorreu um erro ao retornar todas as tasks" });
        }
    });
}
function getTaskComments(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (!id) {
                res.status(400).json({ erro: "Id invalido" });
                return;
            }
            const taskComments = yield taskRepository_1.default.findByTask(id);
            return res.status(200).json(taskComments);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ erro: "Ocorreu um erro ao procurar a tasks" });
        }
    });
}
function getTask(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (!id) {
                res.status(400).json({ erro: "Id invalido" });
                return;
            }
            const task = yield taskRepository_1.default.findById(id);
            return res.status(200).json(task);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ erro: "Ocorreu um erro ao procurar a tasks" });
        }
    });
}
function addTask(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const taskInfo = req.body;
            if (!taskInfo) {
                res.status(400).json({ erro: "Nao foi possivel criar a conta" });
                return;
            }
            const taskCreated = yield taskRepository_1.default.create(taskInfo);
            return res.status(201).json(taskCreated);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ erro: "Ocorreu um erro ao criar task" });
        }
    });
}
function setTask(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (!id) {
                res.status(400).json({ erro: "Id invalido" });
                return;
            }
            const taskParams = req.body;
            if (!taskParams) {
                res.status(400).json({ erro: "Nao foi possivel atualizar a conta" });
                return;
            }
            const taskUpdated = yield taskRepository_1.default.set(id, taskParams);
            return res.status(200).json(taskUpdated);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ erro: "Ocorreu um erro ao atualizar a task" });
        }
    });
}
function deleteTask(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (!id) {
                res.status(400).json({ erro: "Id invalido" });
                return;
            }
            yield taskRepository_1.default.deleteById(id);
            return res.status(204).json({ message: "Task deletada com sucesso" });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ erro: "Ocorreu um erro ao deletar a task" });
        }
    });
}
exports.default = { getTasks, addTask, getTask, setTask, deleteTask, getTaskComments };
