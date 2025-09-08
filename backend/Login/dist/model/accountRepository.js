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
const accountModel_1 = __importDefault(require("./accountModel"));
function getOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield accountModel_1.default.findByPk(id);
    });
}
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield accountModel_1.default.findAll();
    });
}
function create(body) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield accountModel_1.default.create(body);
    });
}
function set(id, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalAccount = yield accountModel_1.default.findByPk(id);
        if (originalAccount !== null) {
            if (body.name)
                originalAccount.name = body.name;
            if (body.email)
                originalAccount.email = body.email;
            if (body.password)
                originalAccount.password = body.password;
            if (body.birth)
                originalAccount.birth = body.birth;
            yield originalAccount.save();
            return originalAccount;
        }
        return null;
    });
}
function destroyAccount(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield accountModel_1.default.destroy({ where: { id: id } });
    });
}
exports.default = { getOne, getAll, create, set, destroyAccount };
