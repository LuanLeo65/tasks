"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const privateKey = fs_1.default.readFileSync(path_1.default.join(__dirname, "../keys/private.key"), "utf8");
const publicKey = fs_1.default.readFileSync(path_1.default.join(__dirname, "../keys/public.key"), "utf8");
const jwtAlgorithm = "RS256";
const refreshAlgorith = "HS256";
const saltRounds = parseInt(`${process.env.SALT_ROUNDS}`);
function hash(password) {
    return bcrypt_1.default.hashSync(password, saltRounds);
}
function compareHash(password, hasPassword) {
    return bcrypt_1.default.compareSync(password, hasPassword);
}
function signJWT(userId) {
    const payload = { userId };
    return jsonwebtoken_1.default.sign(payload, privateKey, { expiresIn: `10min`, algorithm: jwtAlgorithm });
}
function refreshJWT(userId) {
    const payload = { userId };
    return jsonwebtoken_1.default.sign(payload, privateKey, { expiresIn: `7d`, algorithm: refreshAlgorith });
}
function verifyJWT(req, res, next) {
    try {
        const token = req.headers["x-access-token"];
        if (!token)
            return res.sendStatus(401);
        const decoded = jsonwebtoken_1.default.verify(token, publicKey, { algorithms: [jwtAlgorithm] });
        const payload = { userId: decoded.userId, jwt: token };
        res.locals.payload = payload;
        next();
    }
    catch (error) {
        console.log("Erro na validacao do jwt" + error);
        res.sendStatus(401);
    }
}
function validateSchema(schema, req, res, next) {
    const { error } = schema.validate(req.body);
    if (error == null)
        return next();
    const { details } = error;
    const message = details.map((item) => item.message).join(",");
    return res.status(422).json({ error: req.body, message });
}
exports.default = { validateSchema, compareHash, hash, signJWT, verifyJWT };
