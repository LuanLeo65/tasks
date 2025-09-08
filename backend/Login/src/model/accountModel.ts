import database from "../db";
import { IAccount } from "./account";
import { Optional, Model, DataTypes } from "sequelize";

interface IAccountAttributes extends Optional<IAccount, "id"> {}

export interface IAccountModel extends Model<IAccount, IAccountAttributes>, IAccount {}

const Account = database.define<IAccountModel>('accounts', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull: false
    },

    name:{
        type: DataTypes.STRING,
        allowNull:false
    },

    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },

    password:{
        type:DataTypes.STRING,
        allowNull:false
    },

    birth: {
        type: DataTypes.DATE,
        allowNull:false
    },
    role: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "user"
}
})

export default Account
