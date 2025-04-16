import axios from 'axios';

// Se a API for local, você pode usar uma URL relativa para o Electron.
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3333',  // ou a URL de sua API
  timeout: 5000,  // tempo máximo de resposta
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
