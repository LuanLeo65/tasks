import {Sequelize} from "sequelize";

const nameDb = process.env.DB_NAME!
const userDb = process.env.DB_USER!
const passwordDb = process.env.DB_PASSWORD
const hostDb = process.env.DB_HOSTDB

const database = new Sequelize (nameDb, userDb, passwordDb, {
    dialect: 'mysql',
    host: hostDb
})

export default database