import ky, {AfterResponseHook} from 'ky';
import {CoreAPI} from '../services';
import storage from '../../storage';
import UserService from '../../services/user';
import storeToken from '../../utils/storeToken';
import apiClient from './client';
import customShowToast from '../../configs/toast';

const handleToken: AfterResponseHook = async (request, _options, response) => {
  if (response.status !== 401 || request.url.includes('refresh')) {
    return response;
  }

  // refresh token을 이용한 access token 재발급
  try {
    const res = await CoreAPI.getRefreshToken({});
    if (res) {
      const {accessToken, refreshToken} = res;
      storeToken({accessToken, refreshToken});
      return apiClient(request);
    }
  } catch (error) {
    await UserService.logout({});
    storage.set('isLoggedIn', false);
    customShowToast('loginDurationExpiredInfo');
    return response;
  }
};

export default handleToken;
