import {ServiceFunc} from '../../type';
import * as Type from './authAPI.type';

export default interface AuthService {
  sendSMSVerificationCode: ServiceFunc<
    Type.SendSMSVerificationCodeParams,
    Type.SendSMSVerificationCodeRes
  >;
  unregister: ServiceFunc<Type.UnregisterParams, Type.UnregisterRes>;
  signUp: ServiceFunc<Type.SignUpParams, Type.SignUpRes>;
  signIn: ServiceFunc<Type.SignInParams, Type.SignInRes>;
  logout: ServiceFunc<unknown, Type.LogoutRes>;
  getRefreshToken: () => Promise<Type.GetRefreshTokenRes>;
}
