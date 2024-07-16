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
