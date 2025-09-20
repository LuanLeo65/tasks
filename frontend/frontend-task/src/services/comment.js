import BaseUrl from "../configs/BaseUrl";
import baseApi from "./api";

const api = baseApi(BaseUrl.API_TASK);

async function getAllComment() {
  const result = await api.get("task");

  return result.data;
}

async function addComment(taskId, comment) {
  const result = await api.post(`task/${taskId}/comments`, comment);
  return result;
}

async function setComment(commentId, commentUpdated) {
  const result = await api.patch(`/task/${commentId}/comments`, commentUpdated)
  return result 
}

async function deleteComment(id) {
  await api.delete(`/task/comments/${id}`)
}

async function getAllUserComments(userId) {
  const result = await api.get(`task/comments/${userId}`);

  return result.data;
}

export default { getAllComment, addComment, deleteComment, setComment, getAllUserComments };