"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accountsSchema_1 = require("../model/accountsSchema");
const auth_1 = __importDefault(require("../auth"));
function validateAccountSchema(req, res, next) {
    return auth_1.default.validateSchema(accountsSchema_1.accountSchema, req, res, next);
}
function validateAccountUpdateSchema(req, res, next) {
    return auth_1.default.validateSchema(accountsSchema_1.accountUpdateSchema, req, res, next);
}
exports.default = { validateAccountSchema, validateAccountUpdateSchema };
