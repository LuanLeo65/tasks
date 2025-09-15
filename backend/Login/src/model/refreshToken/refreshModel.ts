import { IRefresh } from "./refresh";
import { Optional, Model, DataTypes } from "sequelize";
import database from "../../db";

export interface IRefreshAttributes extends Optional<IRefresh, "id"> {}

export interface IRefreshModel
  extends Model<IRefresh, IRefreshAttributes>,
    IRefresh {}

const RefreshToken = database.define<IRefreshModel>("refresh", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  token: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },

  expires_At: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "accounts",
      key: "id",
    },
    onDelete: "CASCADE",
  },
});

export default RefreshToken;
