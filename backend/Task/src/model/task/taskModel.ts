//model/taskModel.ts
import { Optional, Model, DataTypes } from "sequelize";
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
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Em aberto",
  },
});

export default Task;
