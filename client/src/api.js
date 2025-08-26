import axios from "axios";

const instance = axios.create({
  baseURL: "https://task-manager-c6h3.onrender.com/",
});

export default instance;
