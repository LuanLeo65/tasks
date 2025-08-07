//services/task
import BaseUrl from "../configs/BaseUrl";
import baseApi from "./api";

const api = baseApi(BaseUrl.API_TASK);

async function getAll() {
  const result = await api.get("task");

  return result.data;
}

async function addTask(task) {
  const result = await api.post("task", task);
  return result;
}

async function deleteTask(id) {
  await api.delete(`task/${id}`)
  
}

async function setTask(id, taskUpdated) {
  const result = await api.patch(`/task/${id}`, taskUpdated)
  return result
}

async function getTaskDetails(id) {
 const result =  await api.get(`task/details/${id}`)

 return result.data
}

export default { getAll, addTask, deleteTask, getTaskDetails, setTask };
