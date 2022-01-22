import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API,
});

axiosClient.interceptors.request.use(
  (config: any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (err) => {
    if (err.response) {
      switch (err.response.status) {
        case 401:
          localStorage.removeItem("token");
          break;
        case 403:
          break;
        default:
          return Promise.reject(err);
      }
    }
    return Promise.reject(err);
  }
);

export default axiosClient;
