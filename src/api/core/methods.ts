import {KyJsonResponse} from '../services/type';
import apiClient from './client';

export const get = async <T extends unknown>(
  url: string,
): KyJsonResponse<T> => {
  return await apiClient.get(url).json();
};

export const post = async <T extends unknown>(
  url: string,
  body: unknown,
): KyJsonResponse<T> => {
  return await apiClient.post(url, {json: body}).json();
};
export const patch = async <T extends unknown>(
  url: string,
  body: unknown,
): KyJsonResponse<T> => {
  return await apiClient.patch(url, {json: body}).json();
};

export const del = async <T extends unknown>(
  url: string,
): KyJsonResponse<T> => {
  return await apiClient.delete(url).json();
};
