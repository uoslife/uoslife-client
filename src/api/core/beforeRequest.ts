import {BeforeRequestHook} from 'ky';
import storage from '../../storage';

const setAuthorizationHeader: BeforeRequestHook = request => {
  const accessToken = storage.getString('accessToken');
  const tempToken = storage.getString('tempToken');
  if (accessToken) {
    request.headers.set('Authorization', `Bearer ${accessToken}`);
    return;
  }
  if (tempToken) request.headers.set('Authorization', `Bearer ${tempToken}`);
};

export default setAuthorizationHeader;
