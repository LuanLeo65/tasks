import BaseUrl from "../configs/BaseUrl";
import baseApi from "./api";

const api = baseApi(BaseUrl.API_LOGIN);

function login(user) {
  return api.post("account/login", user);
}

function createAccount(user) {
  return api.post("account", user);
}

function logout(userId) {
    return api.post(`account/logout/${userId}`);
}

function setAccount(id, user) {
    return api.patch(`account/${id}`, user);
}   

function setToken(token) {
    return localStorage.setItem("token", token);
}

function setId(id) {
    return localStorage.setItem("userId", id);
}

function setAuthor(name) {
    return localStorage.setItem("author", name);
}

function getToken() {
    return localStorage.getItem("token");
}

function getId() {
    return localStorage.getItem("userId");
}

function getAuthor() {
    return localStorage.getItem("author");
}

function isAuthenticated() {
    const token = getToken();
    return token !== null;
}

function getAccount(userId) {
    return api.get(`account/${userId}`);
}

export default { login, logout, createAccount, setToken, setId, setAuthor, getToken, getId, getAuthor, isAuthenticated, getAccount, setAccount};