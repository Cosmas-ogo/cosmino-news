import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://first-project-o5bz.onrender.com/api",
  timeout: 10000,
});

export default apiClient;
