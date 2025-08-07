//services/api
import axios from "axios";

export default function baseApi(baseurl) {
  const api = axios.create({
    baseURL: baseurl,
  });

  return api;
}
