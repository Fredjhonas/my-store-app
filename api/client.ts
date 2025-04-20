import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/';

const client = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  maxRedirects: 10,
});

export default client;
