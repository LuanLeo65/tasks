//db.ts
import { Sequelize } from "sequelize";

const nameDb = process.env.NAME_DB!;
const userDb = process.env.USER_DB!;
const passwordDb = process.env.PASSWORD_DB;
const hostDb = process.env.HOST_DB;
const portDb = parseInt(`${process.env.PORT_DB}`);


const database = new Sequelize(nameDb, userDb, passwordDb, {
  dialect: "mysql",
  port: portDb,
  host: hostDb,
});

export default database;
