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
const accountRepository_1 = __importDefault(require("../model/accountRepository"));
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
        }
    });
}
function addAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = req.body;
            if (!payload)
                return res.status(400).json({ error: "Preencha os campos corretamente" });
            const account = yield accountRepository_1.default.create(payload);
            return res.status(201).json(account);
        }
        catch (error) {
            console.log("Ërro ao chamar addAccount:" + error);
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
            yield accountRepository_1.default.set(id, payloadUpdated);
            return res.status(200).json(`Usuário alterado com sucesso!`);
        }
        catch (error) {
            console.log("Ërro ao chamar setAccount:" + error);
        }
    });
}
function deleteAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (!id)
                return res.status(400).json({ error: "Id invalido" });
            yield accountRepository_1.default.destroyAccount(id);
            return res.status(200).json({ message: "Usuario deletado com sucesso!" });
        }
        catch (error) {
            console.log("Ërro ao chamar deleteAccount:" + error);
        }
    });
}
exports.default = { getAccounts, addAccount, deleteAccount, setAccount, getOneAccount };
