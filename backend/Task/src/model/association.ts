import Comment from "./comments/commentsModel";
import Task from "./task/taskModel";

export function setupAssociations() {
  Task.hasMany(Comment, {
    foreignKey: "taskId",
    onDelete: "CASCADE",
    as: "comments",
  });
  Comment.belongsTo(Task, { foreignKey: "taskId", as: "task" });
}
