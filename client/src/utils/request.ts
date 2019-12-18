import axios, { AxiosRequestConfig } from 'axios';
import { API_SERVER } from './constants';

const instance = axios.create({
  baseURL: API_SERVER,
  timeout: 2000,
  withCredentials: true,
});

export const USE_GET_FEED_LIST = (fixedNum: number, skippedNum: number):AxiosRequestConfig => ({
  method: 'GET',
  url: `/feed/images/more/${fixedNum}/${skippedNum}`,
});

export const Axios = async (config:AxiosRequestConfig) => instance.request(config);
