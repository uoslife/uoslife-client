import storage from '../../../../storage';
import {accountApiClientForRefresh} from '../../../core/client';
import {post} from '../../../core/methods';
import AuthService from './authAPI.interface';
import * as Type from './authAPI.type';

const AuthAPI: AuthService = {
  requestSMSAuthentication: params =>
    post<Type.RequestSMSAuthenticationRes>(
      'v1/auth/request',
      params,
      'ACCOUNT',
    ),
  verifySMSAuthentication: params =>
    post<Type.VerifySMSAuthenticationRes>('v1/auth/verify', params, 'ACCOUNT'),
  getRefreshToken: async () => {
    const refreshToken = storage.getString('refreshToken');
    const res = await accountApiClientForRefresh.post('v1/auth/refresh', {
      json: {refreshToken},
    });
    return await res.json();
  },
};
export default AuthAPI;
