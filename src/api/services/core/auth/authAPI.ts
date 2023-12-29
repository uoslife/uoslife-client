import storage from '../../../../storage';
import {baseApiClient} from '../../../core/client';
import {post} from '../../../core/methods';
import AuthService from './authAPI.interface';
import * as Type from './authAPI.type';

const AuthAPI: AuthService = {
  sendSMSVerificationCode: params =>
    post<Type.SendSMSVerificationCodeRes>('core/auth/verification', params),

  unregister: params =>
    post<Type.UnregisterRes>('core/auth/unregister', params),

  signUp: params => {
    const {isDelete, ...rest} = params!;
    return post<Type.SignUpRes>(`core/auth/signup?delete=${isDelete}`, rest);
  },

  signIn: params => post<Type.SignInRes>('core/auth/signin', params),

  logout: params => post<Type.LogoutRes>('core/auth/logout', params),
  getRefreshToken: async () => {
    const refreshToken = storage.getString('refreshToken');
    const res = await baseApiClient.post('core/auth/refresh', {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    return await res.json();
  },
};
export default AuthAPI;
