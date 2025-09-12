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
const refreshModel_1 = __importDefault(require("./refreshModel"));
function getRefreshToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield refreshModel_1.default.findOne({ where: { token: token } });
    });
}
function addRefreshToken(accountId, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        const payload = {
            token: token,
            userId: accountId,
            expires_At: new Date(Date.now() + sevenDays)
        };
        return yield refreshModel_1.default.create(payload);
    });
}
function deleteByToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield refreshModel_1.default.destroy({ where: { token: token } });
    });
}
function deleteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield refreshModel_1.default.destroy({ where: { userId: id } });
    });
}
exports.default = { addRefreshToken, deleteByToken, getRefreshToken, deleteById };
