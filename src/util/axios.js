import axios from 'axios';
import { HOST } from './constants';

const axiosInstance = axios.create({ baseURL: HOST });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;