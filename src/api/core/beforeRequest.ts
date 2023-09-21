import ky, {BeforeRequestHook} from 'ky';
import {storage} from '../../storage';

export const setAuthorizationHeader: BeforeRequestHook = (
  request,
  _options,
) => {
  const accessToken = storage.getString('access_token');
  if (accessToken)
    request.headers.set('Authorization', `Bearer ${accessToken}`);
};
