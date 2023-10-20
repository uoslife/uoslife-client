import ky, {AfterResponseHook} from 'ky';
import {CoreAPI} from '../services';
import storeToken from '../../utils/storeToken';
import {storage} from '../../storage';
import {UserService} from '../../services/user';

export const handleToken: AfterResponseHook = async (
  request,
  _options,
  response,
) => {
  const accessToken = storage.getString('access_token');
  const refreshToken = storage.getString('refresh_token');
  if (response.status !== 401 || request.url.includes('refresh')) {
    // storage.set('user.isLoggedIn', true);
    // TODO: 로직 변경 필요
    return response;
  }
  try {
    request.headers.set('Authorization', `Bearer ${refreshToken}`);
    const res = await CoreAPI.getRefreshToken({});
    if (res) return ky(request);
  } catch (error) {
    await UserService.logout();
    return response;
  }
};
