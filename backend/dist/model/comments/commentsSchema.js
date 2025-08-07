"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const commentSchema = joi_1.default.object({
    author: joi_1.default.string()
        .min(3)
        .max(50)
        .required(),
    comment: joi_1.default.string()
        .min(3)
        .max(1000)
        .required(),
});
exports.default = commentSchema;
