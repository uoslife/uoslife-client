import {ServiceFunc} from '../../type';
import * as Type from './authAPI.type';

export default interface authService {
  signUp: ServiceFunc<Type.SignUpParams, Type.SignUpRes>;
  getRefreshToken: ServiceFunc<unknown, Type.GetRefreshTokenRes>;
  logout: ServiceFunc<unknown, Type.LogoutRes>;
  login: ServiceFunc<Type.LoginParams, Type.LoginRes>;
}
