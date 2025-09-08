"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAssociations = setupAssociations;
const commentsModel_1 = __importDefault(require("./comments/commentsModel"));
const taskModel_1 = __importDefault(require("./task/taskModel"));
function setupAssociations() {
    taskModel_1.default.hasMany(commentsModel_1.default, { foreignKey: 'taskId', as: 'comments' });
    commentsModel_1.default.belongsTo(taskModel_1.default, { foreignKey: 'taskId', as: 'task' });
}
