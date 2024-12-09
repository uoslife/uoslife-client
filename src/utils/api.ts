import {apiClient, accountApiClient} from '../api/core/client';
import {ClientType} from '../api/services/type';

// eslint-disable-next-line consistent-return
export const changeClient = (client: ClientType) => {
  switch (client) {
    case 'DEFAULT':
      return apiClient;
    case 'ACCOUNT':
      return accountApiClient;
  }
};

export const isJsonContentType = (contentType: ReturnType<Headers['get']>) => {
  return contentType && contentType.includes('application/json');
};

export const getContentLength = (headers: Headers) => {
  const length = getHeader('Content-Length', headers);
  return length ? Number(length) : null;
};

export const getHeader = (header: string, headers: Headers) =>
  headers.get(header) || headers.get(header.toLowerCase());
