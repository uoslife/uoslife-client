import {BeforeRequestHook} from 'ky';
import storage from '../../storage';

const setAuthorizationHeader: BeforeRequestHook = request => {
  const accessToken = storage.getString('accessToken');
  if (accessToken)
    request.headers.set('Authorization', `Bearer ${accessToken}`);
};

export default setAuthorizationHeader;
