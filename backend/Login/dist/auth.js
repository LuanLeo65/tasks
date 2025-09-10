"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = parseInt(`${process.env.SALT_ROUNDS}`);
function hash(password) {
    return bcrypt_1.default.hashSync(password, saltRounds);
}
function compareHash(password, hasPassword) {
    return bcrypt_1.default.compareSync(password, hasPassword);
}
function validateSchema(schema, req, res, next) {
    const { error } = schema.validate(req.body);
    if (error == null)
        return next();
    const { details } = error;
    const message = details.map((item) => item.message).join(",");
    return res.status(422).json({ error: req.body, message });
}
exports.default = { validateSchema, compareHash, hash };
