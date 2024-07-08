import {KyJsonResponse, IErrorResponse, ErrorCode} from '../services/type';
import {apiClient, accountApiClient} from './client';

class CustomError extends Error implements IErrorResponse {
  code: ErrorCode;

  date: Date;

  status: number;

  // @ts-expect-error: expected params
  constructor(status: number, code: ErrorCode, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    // Custom debugging information
    this.code = code;
    this.date = new Date();
    this.status = status;
  }
}

export const get = async <T extends unknown>(
  url: string,
  clientType: ClientType = 'DEFAULT',
): KyJsonResponse<T> => {
  const client = changeClient(clientType);

  try {
    return await client.get(url).json();
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
      ? await client.post(url, {json: body}).json()
      : await client.post(url).json();
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
    return await client.patch(url, {json: body}).json();
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
    const res = await client.put(url, {json: body}).json();
    if (res === '') {
      return undefined as T;
    }
    return res as T;
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
    const res = await client.delete(url, {json: body}).json();
    if (res === '') {
      return undefined as T;
    }
    return res as T;
  } catch (error) {
    const errorJson = await (error as any).response.json();
    const {message, status, code} = errorJson;

    throw new CustomError(status, code, message);
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
