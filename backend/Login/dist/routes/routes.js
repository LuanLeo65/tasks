"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = __importDefault(require("../controller/login"));
const middleware_1 = __importDefault(require("./middleware"));
const route = (0, express_1.Router)();
route.get("/accounts", middleware_1.default.validateAuthentication, login_1.default.getAccounts);
route.get("/account/:id", middleware_1.default.validateAuthentication, login_1.default.getOneAccount);
route.post("/account", middleware_1.default.validateAccountSchema, login_1.default.addAccount);
route.post("/account/login", middleware_1.default.validateAccountLoginSchema, login_1.default.login);
route.post("/account/logout/:id", middleware_1.default.validateAuthentication, login_1.default.logout);
route.patch("/account/:id", middleware_1.default.validateAuthentication, middleware_1.default.validateAccountUpdateSchema, login_1.default.setAccount);
route.delete("/account/:id", middleware_1.default.validateAuthentication, login_1.default.deleteAccount);
route.post("/account/refresh", login_1.default.refresh);
exports.default = route;
