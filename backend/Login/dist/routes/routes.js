"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = __importDefault(require("../controller/login"));
const middleware_1 = __importDefault(require("./middleware"));
const route = (0, express_1.Router)();
route.get("/accounts", login_1.default.getAccounts);
route.get("/account/:id", login_1.default.getOneAccount);
route.post("/account", middleware_1.default.validateAccountSchema, login_1.default.addAccount);
route.patch("/account/:id", middleware_1.default.validateAccountUpdateSchema, login_1.default.setAccount);
route.delete("/account/:id", login_1.default.deleteAccount);
exports.default = route;
