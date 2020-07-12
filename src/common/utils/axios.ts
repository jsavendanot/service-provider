import axios from 'axios';

const instance = axios.create({
  //baseURL: 'https://recoveryplanwebapitest.azurewebsites.net/api',
  baseURL: 'https://recoveryplanwebapi.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    ContactType: '935000001'
  }
});

export default instance;
