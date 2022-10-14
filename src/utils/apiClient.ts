import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://634927520b382d796c7ee9e6.mockapi.io'
});

export default apiClient;
