"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const nameDb = process.env.DB_NAME;
const userDb = process.env.DB_USER;
const passwordDb = process.env.DB_PASSWORD;
const hostDb = process.env.DB_HOSTDB;
const database = new sequelize_1.Sequelize(nameDb, userDb, passwordDb, {
    dialect: "mysql",
    host: hostDb,
});
exports.default = database;
