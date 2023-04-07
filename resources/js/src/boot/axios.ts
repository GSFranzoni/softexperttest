import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

console.log(import.meta.env);

const token = localStorage.getItem('token');

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;