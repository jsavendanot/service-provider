import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://recoveryplanwebapi.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    UserType: '935000001'
  }
});

export default instance;
