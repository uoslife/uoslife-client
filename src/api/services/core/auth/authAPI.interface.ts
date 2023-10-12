import {ServiceFunc} from '../../type';
import * as Type from './authAPI.type';

export default interface authService {
  sendSMSVerificationCode: ServiceFunc<
    Type.SendSMSVerificationCodeParams,
    Type.SendSMSVerificationCodeRes
  >;
  signUp: ServiceFunc<Type.SignUpParams, Type.SignUpRes>;
  signIn: ServiceFunc<Type.SignInParams, Type.SignInRes>;
  getRefreshToken: ServiceFunc<unknown, Type.GetRefreshTokenRes>;
  logout: ServiceFunc<unknown, Type.LogoutRes>;
}
