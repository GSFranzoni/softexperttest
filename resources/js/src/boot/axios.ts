import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {router} from "../router";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const token = localStorage.getItem('token');

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { pathname } = window.location;
    if (error.response.status === 401 && pathname !== '/auth/login') {
      updateLocalStorageToken(null)
      await router.navigate('/auth/login');
    }
    return Promise.reject(error);
  },
);

export const updateLocalStorageToken = (token: string | null) => {
  if (!token) {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    return;
  }
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  localStorage.setItem('token', token);
}