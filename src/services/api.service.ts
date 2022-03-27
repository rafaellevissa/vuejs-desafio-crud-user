import axios, { AxiosRequestConfig } from "axios";

const apiUrl = String(process.env.VUE_APP_API_HOST);

const config: AxiosRequestConfig = {
  baseURL: apiUrl,
};

export default axios.create(config);
