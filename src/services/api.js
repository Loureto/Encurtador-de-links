import axios from 'axios';

export const key = '9c2bcbfa59c43a9072f788e9db14d19394474d3b';

//base url: https://api-ssl.bitly.com/v4/

const api = axios.create({
  baseURL: 'https://api-ssl.bitly.com/v4',
  headers:{
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${key}`
  }

})

export default api;













