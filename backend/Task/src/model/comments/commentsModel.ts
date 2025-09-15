//model/comments/commentsModel.ts
import { Model, DataTypes, Optional } from "sequelize";
import { IComments } from "./comments";
import database from "../../db";

interface ICommentsAttributes extends Optional<IComments, "id"> {}

export interface ICommentsModel
  extends Model<IComments, ICommentsAttributes>,
    IComments {}

const Comment = database.define<ICommentsModel>("comments", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  taskId: {
    type: DataTypes.INTEGER,
    references: {
      model: "tasks",
      key: "id",
    },
    onDelete: "CASCADE",
  },
});

export default Comment;
