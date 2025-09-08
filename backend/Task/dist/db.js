"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//db.ts
const sequelize_1 = require("sequelize");
const nameDb = process.env.NAME_DB;
const userDb = process.env.USER_DB;
const passwordDb = process.env.PASSWORD_DB;
const hostDb = process.env.HOST_DB;
const database = new sequelize_1.Sequelize(nameDb, userDb, passwordDb, {
    dialect: "mysql",
    host: hostDb,
});
exports.default = database;
