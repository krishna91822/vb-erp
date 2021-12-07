import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;

let headers = {};

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYTkzMDc2MTc4ODI3MTFjMjhlZTliZSIsImlhdCI6MTYzODUxNDMzMCwiZXhwIjoxNjQ2MjkwMzMwfQ.aouUE8Hq_ANNJYeV4qPOLaHttPYyf7KOV4j8xBSvBDc';

if (token) {
  headers.Authorization = `Bearer ${token}`;
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers,
});

axiosInstance.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response.data);
    }),
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    if (error.response.status === 403) {
      window.location = '/login';
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
);

export default axiosInstance;
