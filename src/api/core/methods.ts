import {KyJsonResponse} from '../services/type';
import apiClient from './client';

export const get = async <T extends unknown>(
  url: string,
): KyJsonResponse<T> => {
  const getRes = await apiClient.get(url);
  return await getRes.json();
};

export const post = async <T extends unknown>(
  url: string,
  body: unknown,
): KyJsonResponse<T> => {
  const postRes = await apiClient.post(url, {json: body});
  return await postRes.json();
};
export const patch = async <T extends unknown>(
  url: string,
  body: unknown,
): KyJsonResponse<T> => {
  const patchRes = await apiClient.patch(url, {json: body});
  return await patchRes.json();
};

export const del = async <T extends unknown>(
  url: string,
): KyJsonResponse<T> => {
  const deleteRes = await apiClient.delete(url);
  return await deleteRes.json();
};
