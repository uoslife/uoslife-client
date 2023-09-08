import {post} from '../../../core/methods';
import AuthService from './authAPI.interface';
import * as Type from './authAPI.type';

const AuthAPI: AuthService = {
  signUp: params => post<Type.SignUpRes>('core/auth/signup', params),

  getRefreshToken: params =>
    post<Type.GetRefreshTokenRes>('core/auth/refresh', params),
  logout: params => post<Type.LogoutRes>('core/auth/logout', params),
  login: params => post<Type.LoginRes>('core/auth/login', params),
};
export default AuthAPI;
