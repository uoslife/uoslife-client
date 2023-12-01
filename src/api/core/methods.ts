import {KyJsonResponse} from '../services/type';
import apiClient from './client';

export const get = async <T extends unknown>(
  url: string,
): KyJsonResponse<T> => {
  const getRes = await apiClient.get(url);
  const getJsonRes = (await getRes.json()) as KyJsonResponse<T>;
  return getJsonRes;
};

export const post = async <T extends unknown>(
  url: string,
  body?: unknown,
): KyJsonResponse<T> => {
  const postRes = body
    ? await apiClient.post(url, {json: body})
    : await apiClient.post(url);
  try {
    const postJsonRes = (await postRes.json()) as KyJsonResponse<T>;
    return postJsonRes;
  } catch (error) {
    return null as unknown as KyJsonResponse<T>;
  }
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
