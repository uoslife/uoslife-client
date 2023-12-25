import ky, {AfterResponseHook} from 'ky';
import {CoreAPI} from '../services';
import storage from '../../storage';
import UserService from '../../services/user';
import storeToken from '../../utils/storeToken';

const handleToken: AfterResponseHook = async (request, _options, response) => {
  const refreshTokenInStorage = storage.getString('refreshToken');
  if (response.status !== 401 || request.url.includes('refresh')) {
    return response;
  }
  try {
    request.headers.set('Authorization', `Bearer ${refreshTokenInStorage}`);
    const res = await CoreAPI.getRefreshToken({});
    if (res) {
      const {accessToken, refreshToken} = res;
      storeToken({accessToken, refreshToken});
      return ky(request);
    }
  } catch (error) {
    await UserService.logout({});
    storage.set('isLoggedIn', false);
    return response;
  }
};
export default handleToken;
