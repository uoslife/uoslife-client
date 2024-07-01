import {KyJsonResponse} from '../services/type';
import {apiClient, accountApiClient} from './client';

export const get = async <T extends unknown>(
  url: string,
  clientType: ClientType = 'DEFAULT',
): KyJsonResponse<T> => {
  const client = changeClient(clientType);
  const getRes = await client.get(url);
  const getJsonRes = (await getRes.json()) as KyJsonResponse<T>;
  return getJsonRes;
};

export const post = async <T extends unknown>(
  url: string,
  body?: unknown,
  clientType: ClientType = 'DEFAULT',
): KyJsonResponse<T> => {
  const client = changeClient(clientType);
  const postRes = body
    ? await client.post(url, {json: body})
    : await client.post(url);
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
  clientType: ClientType = 'DEFAULT',
): KyJsonResponse<T> => {
  const client = changeClient(clientType);
  const patchRes = await client.patch(url, {json: body});
  return await patchRes.json();
};

export const put = async <T extends unknown>(
  url: string,
  body: unknown,
  clientType: ClientType = 'DEFAULT',
): KyJsonResponse<T> => {
  const client = changeClient(clientType);
  const putRes = await client.put(url, {json: body});
  return await putRes.json();
};

export const del = async <T extends unknown>(
  url: string,
  body?: unknown,
  clientType: ClientType = 'DEFAULT',
): KyJsonResponse<T> => {
  const client = changeClient(clientType);
  const deleteRes = body
    ? await client.delete(url, {json: body})
    : await client.delete(url);
  try {
    const postJsonRes = (await deleteRes.json()) as KyJsonResponse<T>;
    return postJsonRes;
  } catch (error) {
    return null as unknown as KyJsonResponse<T>;
  }
};

type ClientType = 'DEFAULT' | 'ACCOUNT';
// eslint-disable-next-line consistent-return
const changeClient = (client: ClientType) => {
  switch (client) {
    case 'DEFAULT':
      return apiClient;
    case 'ACCOUNT':
      return accountApiClient;
  }
};
