import {KyJsonResponse, ClientType} from '../services/type';
import {changeClient, isJsonContentType} from '../../utils/api';
import {CustomError} from './customError';

export const get = async <T extends unknown>(
  url: string,
  clientType: ClientType = 'DEFAULT',
): KyJsonResponse<T> => {
  const client = changeClient(clientType);

  try {
    return await client
      .get(url)
      .then(res =>
        isJsonContentType(res.headers.get('Content-Type'))
          ? res.json()
          : res.text(),
      );
  } catch (error) {
    const errorJson = await (error as any).response.json();
    const {message, status, code} = errorJson;

    throw new CustomError(status, code, message);
  }
};

export const post = async <T extends unknown>(
  url: string,
  body?: unknown,
  clientType: ClientType = 'DEFAULT',
): KyJsonResponse<T> => {
  const client = changeClient(clientType);
  try {
    return body
      ? await client
          .post(url, {json: body})
          .then(res =>
            isJsonContentType(res.headers.get('Content-Type'))
              ? res.json()
              : res.text(),
          )
      : await client
          .post(url)
          .then(res =>
            isJsonContentType(res.headers.get('Content-Type'))
              ? res.json()
              : res.text(),
          );
  } catch (error) {
    const errorJson = await (error as any).response.json();
    const {message, status, code} = errorJson;

    throw new CustomError(status, code, message);
  }
};

export const patch = async <T extends unknown>(
  url: string,
  body: unknown,
  clientType: ClientType = 'DEFAULT',
): KyJsonResponse<T> => {
  const client = changeClient(clientType);
  try {
    return await client
      .patch(url, {json: body})
      .then(res =>
        isJsonContentType(res.headers.get('Content-Type'))
          ? res.json()
          : res.text(),
      );
  } catch (error) {
    const errorJson = await (error as any).response.json();
    const {message, status, code} = errorJson;

    throw new CustomError(status, code, message);
  }
};

export const put = async <T extends unknown>(
  url: string,
  body: unknown,
  clientType: ClientType = 'DEFAULT',
): KyJsonResponse<T> => {
  const client = changeClient(clientType);
  try {
    return body
      ? await client
          .put(url, {json: body})
          .then(res =>
            isJsonContentType(res.headers.get('Content-Type'))
              ? res.json()
              : res.text(),
          )
      : await client
          .put(url)
          .then(res =>
            isJsonContentType(res.headers.get('Content-Type'))
              ? res.json()
              : res.text(),
          );
  } catch (error) {
    const errorJson = await (error as any).response.json();
    const {message, status, code} = errorJson;

    throw new CustomError(status, code, message);
  }
};

export const del = async <T extends unknown>(
  url: string,
  body?: unknown,
  clientType: ClientType = 'DEFAULT',
): KyJsonResponse<T> => {
  const client = changeClient(clientType);

  try {
    return body
      ? await client
          .delete(url, {json: body})
          .then(res =>
            isJsonContentType(res.headers.get('Content-Type'))
              ? res.json()
              : res.text(),
          )
      : await client
          .delete(url)
          .then(res =>
            isJsonContentType(res.headers.get('Content-Type'))
              ? res.json()
              : res.text(),
          );
  } catch (error) {
    const errorJson = await (error as any).response.json();
    const {message, status, code} = errorJson;

    throw new CustomError(status, code, message);
  }
};
