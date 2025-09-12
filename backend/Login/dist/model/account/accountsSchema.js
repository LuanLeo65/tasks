"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountLoginSchema = exports.accountUpdateSchema = exports.accountSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const accountSchema = joi_1.default.object({
    name: joi_1.default.string()
        .min(3)
        .max(50)
        .required(),
    email: joi_1.default.string()
        .email()
        .min(8)
        .max(50)
        .required(),
    password: joi_1.default.string()
        .min(6)
        .max(20)
        .required(),
    birth: joi_1.default.date()
        .less('now')
        .greater('1-1-1900')
        .required(),
    role: joi_1.default.string()
        .valid("user", "admin")
        .default("user")
});
exports.accountSchema = accountSchema;
const accountUpdateSchema = joi_1.default.object({
    name: joi_1.default.string()
        .min(3)
        .max(50)
        .required(),
    email: joi_1.default.string()
        .email()
        .min(8)
        .max(50)
        .required(),
    password: joi_1.default.string()
        .min(6)
        .max(20)
        .required(),
    birth: joi_1.default.date()
        .less('now')
        .greater('1-1-1900')
        .required(),
});
exports.accountUpdateSchema = accountUpdateSchema;
const accountLoginSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email()
        .min(8)
        .max(50)
        .required(),
    password: joi_1.default.string()
        .min(6)
        .max(20)
        .required(),
});
exports.accountLoginSchema = accountLoginSchema;
