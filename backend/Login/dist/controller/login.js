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
const accountRepository_1 = __importDefault(require("../model/account/accountRepository"));
const refreshRepository_1 = __importDefault(require("../model/refreshToken/refreshRepository"));
const auth_1 = __importDefault(require("../auth"));
function getAccounts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const accounts = yield accountRepository_1.default.getAll();
            if (!accounts)
                return res.status(404).json({ error: "Nenhum usuario encontrado" });
            return res.status(200).json(accounts);
        }
        catch (error) {
            console.log("Ërro ao chamar getAccounts:" + error);
            res.sendStatus(500);
        }
    });
}
function getOneAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (!id)
                return res.status(400).json({ error: "Id invalido" });
            const account = yield accountRepository_1.default.getOne(id);
            if (!account)
                return res.status(404).json({ error: "Usuario nao encontrado" });
            return res.status(200).json(account);
        }
        catch (error) {
            console.log("Ërro ao chamar getOneAccount:" + error);
            res.sendStatus(500);
        }
    });
}
function addAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = req.body;
            if (!payload)
                return res.status(400).json({ error: "Preencha os campos corretamente" });
            const hash = auth_1.default.hash(payload.password);
            payload.password = hash;
            const account = yield accountRepository_1.default.create(payload);
            account.password = "";
            return res.status(201).json(account);
        }
        catch (error) {
            console.log("Ërro ao chamar addAccount:" + error);
            res.sendStatus(500);
        }
    });
}
function setAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (!id)
                return res.status(400).json({ error: "Id invalido" });
            const payloadUpdated = req.body;
            if (!payloadUpdated)
                return res.status(400).json({ error: "Preencha os campos corretamente" });
            if (payloadUpdated.password) {
                const hash = auth_1.default.hash(payloadUpdated.password);
                payloadUpdated.password = hash;
            }
            const updatedAccount = yield accountRepository_1.default.set(id, payloadUpdated);
            if (!updatedAccount)
                return res.status(404).json({ error: "Usuario nao encontrado" });
            return res.status(200).json(`Usuário alterado com sucesso!`);
        }
        catch (error) {
            console.log("Ërro ao chamar setAccount:" + error);
            res.sendStatus(500);
        }
    });
}
function deleteAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (!id)
                return res.status(400).json({ error: "Id invalido" });
            yield accountRepository_1.default.deleteById(id);
            return res.status(200).json({ message: "Usuario deletado com sucesso!" });
        }
        catch (error) {
            console.log("Ërro ao chamar deleteAccount:" + error);
            res.sendStatus(500);
        }
    });
}
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = req.body;
            if (!payload)
                return res.status(400).json({ error: "Preencha os campos corretamente" });
            const account = yield accountRepository_1.default.findByEmail(payload.email);
            if (account !== null) {
                const comparePassword = auth_1.default.compareHash(payload.password, account.password);
                if (comparePassword) {
                    const token = auth_1.default.signJWT(account.id);
                    const refresh = auth_1.default.refreshJWT(account.id);
                    yield refreshRepository_1.default.addRefreshToken(account.id, refresh);
                    res.cookie("refreshToken", refresh, { httpOnly: true, secure: false });
                    return res.status(200).json({ message: `Usuario ${account.name} logado com sucesso!`, token: token, userId: account.id });
                }
                return res.status(400).json({ error: 'Usuario ou senha invalidos' });
            }
            return res.status(400).json({ error: 'Usuario ou senha invalidos' });
        }
        catch (error) {
            console.log("Ërro ao chamar login:" + error);
            res.sendStatus(500);
        }
    });
}
function logout(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (!id)
                return res.json({ erro: "id invalido" });
            yield refreshRepository_1.default.deleteById(id);
            res.status(200).json({ token: null });
        }
        catch (error) {
            console.log("Ërro ao chamar logout:" + error);
            res.sendStatus(500);
        }
    });
}
function refresh(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
            return res.sendStatus(403);
        const refreshDb = yield refreshRepository_1.default.getRefreshToken(refreshToken);
        if (!refreshDb)
            return res.sendStatus(403);
        if (refreshDb.expires_At < new Date()) {
            yield refreshRepository_1.default.deleteByToken(refreshDb.token);
            return res.status(403).json({ error: "Refresh token expirado!" });
        }
        try {
            const user = yield auth_1.default.verifyRefreshToken(refreshToken);
            const newToken = auth_1.default.signJWT(user.userId);
            res.json({ token: newToken, user: { id: user.userId } });
        }
        catch (error) {
            console.log("Ërro ao chamar refresh:" + error);
            res.sendStatus(500);
        }
    });
}
exports.default = { getAccounts, addAccount, deleteAccount, setAccount, getOneAccount, login, logout, refresh };
