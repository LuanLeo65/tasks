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
//model/taskRepository.ts
const taskModel_1 = __importDefault(require("./taskModel"));
const commentsModel_1 = __importDefault(require("../comments/commentsModel"));
function findAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const tasks = yield taskModel_1.default.findAll();
        return tasks;
    });
}
function findByTask(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const task = yield taskModel_1.default.findByPk(id, { include: [{ model: commentsModel_1.default, as: 'comments' }] });
        return task;
    });
}
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const task = yield taskModel_1.default.findOne({ where: { id: id } });
        return task;
    });
}
function create(task) {
    return __awaiter(this, void 0, void 0, function* () {
        const createTask = yield taskModel_1.default.create(task);
        return createTask;
    });
}
function set(id, task) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalTask = yield taskModel_1.default.findByPk(id);
        if (originalTask !== null) {
            if (task.title)
                originalTask.title = task.title;
            if (task.description)
                originalTask.description = task.description;
            if (task.status)
                originalTask.status = task.status;
            yield originalTask.save();
            return originalTask;
        }
        return null;
    });
}
function deleteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield taskModel_1.default.destroy({ where: { id: id } });
    });
}
exports.default = { findAll, create, findById, set, deleteById, findByTask };
