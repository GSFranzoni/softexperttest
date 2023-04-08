import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const token = localStorage.getItem('token');

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const updateLocalStorageToken = (token: string | null) => {
  if (!token) {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    return;
  }
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  localStorage.setItem('token', token);
}