import axios from 'axios';
import config from './apiConfig';
import { HTTP_METHODS } from '../types';

const instance = axios.create({
  baseURL: config.SERVER_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export const fetcher = (url: string, method: string, body?: any) => {
  let responseData = null;

  switch (method) {
    case HTTP_METHODS.GET:
      responseData = getMethod(url);
      break;
    case HTTP_METHODS.POST:
      responseData = postMethod(url, body);
      break;
    case HTTP_METHODS.PUT:
      responseData = putMethod(url, body);
      break;
    case HTTP_METHODS.DELETE:
      responseData = deleteMethod(url);
      break;
    default:
      break;
  }

  return responseData;
};

export const getMethod = (url: string) => {
  return instance.get(url).then((res) => {
    if (!res.data) {
      throw Error(res.data.message);
    }

    return res.data;
  });
};

const postMethod = (url: string, body?: any) => {
  return instance.post(url, body).then((res) => {
    if (!res.data) {
      throw Error(res.data.message);
    }

    return res.data;
  });
};

const putMethod = (url: string, body?: any) => {
  return instance.put(url, body).then((res) => {
    if (!res.data) {
      throw Error(res.data.message);
    }

    return res.data;
  });
};

const deleteMethod = (url: string) => {
  return instance.delete(url).then((res) => {
    return res.data;
  });
};

export default instance;
