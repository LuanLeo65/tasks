"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//model/comments/commentsModel.ts
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../db"));
const Comment = db_1.default.define('comments', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    author: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    comment: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    taskId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'tasks',
            key: 'id'
        }
    }
});
exports.default = Comment;
