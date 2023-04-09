import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const token = localStorage.getItem('token');

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      updateLocalStorageToken(null)
      window.location.href = '/auth/login';
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