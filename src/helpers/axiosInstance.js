import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

let headers = {};

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYTg4MjYwMzEzODc2NTU1OWYzYTdmMiIsImlhdCI6MTYzOTY0NTMzMywiZXhwIjoxNjQ3NDIxMzMzfQ.qaa834lAX2D3Ooi2-o4YCj5zYd4_QWWN9ZW-fCphyqc";

if (token) {
  headers.Authorization = `Bearer ${token}`;
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers,
});

axiosInstance.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    if (error.response.status === 403) {
      window.location = "/login";
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
);

export default axiosInstance;
