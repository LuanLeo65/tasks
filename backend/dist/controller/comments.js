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
const commentsRepository_1 = __importDefault(require("../model/comments/commentsRepository"));
function getAllComments(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const comments = yield commentsRepository_1.default.findAll();
            return res.status(200).json(comments);
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ erro: "Erro ao retornar todos os comentarios" });
        }
    });
}
function getCommentsOfTask(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.taskId);
            if (!id) {
                res.status(400).json({ erro: "Id invalido" });
                return;
            }
            const commentsTask = yield commentsRepository_1.default.findAllbyTask(id);
            return res.status(200).json(commentsTask);
        }
        catch (error) {
            if (error.message === "Task nao encontrada") {
                return res.status(404).json({ erro: error.message });
            }
            console.log(error);
            return res
                .status(500)
                .json({ erro: "Erro ao retornar o comentario dessa task" });
        }
    });
}
function addComment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.taskId);
            if (!id) {
                res.status(400).json({ erro: "Id invalido" });
                return;
            }
            const commentsParams = req.body;
            if (!commentsParams) {
                res.status(400).json({ erro: "Informações invalidas" });
                return;
            }
            const comment = yield commentsRepository_1.default.addComment(id, commentsParams);
            return res.status(201).json(comment);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ erro: "Erro ao adicionar o comentario" });
        }
    });
}
exports.default = { addComment, getCommentsOfTask, getAllComments };
