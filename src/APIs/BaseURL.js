import axios from 'axios'

export const baseUrl = axios.create({baseURL:'http://localhost:5000'})

baseUrl.interceptors.request.use((req) => {
    req.headers.authorization = localStorage.getItem("token");
    return req;
  });