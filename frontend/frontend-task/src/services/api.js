//services/api
import axios from "axios";
import auth from "./login";

export default function baseApi(baseurl) {
  const api = axios.create({
    baseURL: baseurl,
  });

  api.interceptors.request.use(async (config) => {
    const token = auth.getToken();
    if (token) {
      config.headers["x-access-token"] = `${token}`;
    }

    return config;
  })
  
   api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await api.post("/account/refresh", null, {withCredentials: true});
        localStorage.setItem("token", data.token);

        originalRequest.headers["x-access-token"] = `${data.token}`;
        return api(originalRequest);
      } catch (err) {
        window.location.href = "/login"
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);




  return api;
}
