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
//model/comments/commentsRepository.ts
const commentsModel_1 = __importDefault(require("./commentsModel"));
const taskModel_1 = __importDefault(require("../task/taskModel"));
function findAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const comments = yield commentsModel_1.default.findAll();
        return comments;
    });
}
function findAllbyTask(taskId) {
    return __awaiter(this, void 0, void 0, function* () {
        const task = yield taskModel_1.default.findByPk(taskId);
        if (!task) {
            throw new Error('Task nao encontrada');
        }
        const comments = yield commentsModel_1.default.findAll({ where: { taskId: taskId } });
        return comments;
    });
}
function addComment(taskId, comment) {
    return __awaiter(this, void 0, void 0, function* () {
        const task = yield taskModel_1.default.findByPk(taskId);
        if (!task) {
            throw new Error('Task nao encontrada');
        }
        const comments = yield commentsModel_1.default.create(Object.assign(Object.assign({}, comment), { taskId }));
        return comments;
    });
}
exports.default = { findAll, addComment, findAllbyTask };
