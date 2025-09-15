//model/taskModel.ts
import { Model, DataTypes, Optional } from "sequelize";
import { ITask } from "./task";
import database from "../../db";

interface ITaskAttributes extends Optional<ITask, "id"> {}

export interface ITaskModel extends Model<ITask, ITaskAttributes>, ITask {}

const Task = database.define<ITaskModel>("task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Em aberto",
  },
});

export default Task;
