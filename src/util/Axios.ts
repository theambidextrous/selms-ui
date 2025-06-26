import axios from 'axios';

let BaseUrl = import.meta.env.VITE_LOCAL_URL;

if(import.meta.env.BASE_URL === 'DEV'){
  BaseUrl = import.meta.env.VITE_DEV_URL;
}

if(import.meta.env.VITE_ENV === 'PROD'){
  BaseUrl = import.meta.env.VITE_PROD_URL;
}

const AxiosInstance = axios.create({
  baseURL: BaseUrl,
  timeout: 5000,
  headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
});

export  { BaseUrl, AxiosInstance};