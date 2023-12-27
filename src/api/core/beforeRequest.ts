import {BeforeRequestHook} from 'ky';
import storage from '../../storage';

const setAuthorizationHeader: BeforeRequestHook = request => {
  const accessToken = storage.getString('accessToken');
  const refreshToken = storage.getString('refreshToken');
  const tempToken = storage.getString('tempToken');

  // access token 재발급 API 요청일 때
  if (request.url.includes('refresh')) {
    request.headers.set('Authorization', `Bearer ${refreshToken}`);
    return;
  }

  if (accessToken) {
    request.headers.set('Authorization', `Bearer ${accessToken}`);
    return;
  }
  if (tempToken) request.headers.set('Authorization', `Bearer ${tempToken}`);
};

export default setAuthorizationHeader;
