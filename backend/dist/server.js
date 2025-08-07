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
//server.ts
const db_1 = __importDefault(require("./db"));
const app_1 = __importDefault(require("./app"));
const association_1 = require("./model/association");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const port = parseInt(`${process.env.PORT}`);
        yield db_1.default.sync();
        console.log(`Rodando o banco de dados ${process.env.NAME_DB}`);
        (0, association_1.setupAssociations)();
        yield app_1.default.listen(port);
        console.log(`Rodando na porta ${port}`);
    }
    catch (error) {
        console.log(error);
    }
}))();
