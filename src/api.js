// API using Axios
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:4242/api/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default client;
