//model/comments/commentsRepository.ts
import Comment, { ICommentsModel } from "./commentsModel";
import { IComments } from "./comments";
import Task from "../task/taskModel";

async function findAll() {
  const comments = await Comment.findAll();
  return comments;
}

async function findAllbyTask(taskId: number) {
  await Task.findByPk(taskId);
  const comments = await Comment.findAll({ where: { taskId: taskId } });

  return comments;
}

async function addComment(taskId: number, comment: IComments) {
  const task = await Task.findByPk(taskId);
  if (!task) {
    throw new Error("Task nao encontrada");
  }
  const comments = await Comment.create({ ...comment, taskId });

  return comments;
}
async function setComment(idComment: number, comment: IComments) {
  const originalComment = await Comment.findByPk<ICommentsModel>(idComment);
  if (originalComment !== null) {
    if (comment.author) originalComment.author = comment.author;

    if (comment.comment) originalComment.comment = comment.comment;

    await originalComment.save();

    return originalComment;
  }

  return null;
}

async function deleteComment(commentId: number) {
  return Comment.destroy({ where: { id: commentId } });
}
export default {
  findAll,
  addComment,
  findAllbyTask,
  deleteComment,
  setComment,
};
