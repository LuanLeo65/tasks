//db.ts
import { Sequelize } from "sequelize";

const nameDb = process.env.NAME_DB!;
const userDb = process.env.USER_DB!;
const passwordDb = process.env.PASSWORD_DB;
const hostDb = process.env.HOST_DB;

const database = new Sequelize(nameDb, userDb, passwordDb, {
  dialect: "mysql",
  host: hostDb,
});

export default database;
