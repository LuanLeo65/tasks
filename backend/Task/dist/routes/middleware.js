"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commentsSchema_1 = __importDefault(require("../model/comments/commentsSchema"));
const taskSchema_1 = __importDefault(require("../model/task/taskSchema"));
function validateTask(req, res, next) {
    const { error } = taskSchema_1.default.validate(req.body);
    if (error == null)
        return next();
    const { details } = error;
    const message = details.map((item) => item.message).join(",");
    console.log(`validateTask: ${message}`);
    return res.status(422).json({
        error: req.body,
        message,
    });
}
function validateComments(req, res, next) {
    const { error } = commentsSchema_1.default.validate(req.body);
    if (error == null)
        return next();
    const { details } = error;
    const message = details.map((item) => item.message).join(',');
    console.log(`validateComments: ${message}`);
    return res.status(422).json({
        error: req.body,
        message
    });
}
exports.default = { validateComments, validateTask };
