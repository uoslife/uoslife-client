import {ServiceFunc} from '../../type';
import * as Type from './authAPI.type';

export default interface AuthService {
  requestSMSAuthentication: ServiceFunc<
    Type.RequestSMSAuthenticationParams,
    Type.RequestSMSAuthenticationRes
  >;
  verifySMSAuthentication: ServiceFunc<
    Type.VerifySMSAuthenticationParams,
    Type.VerifySMSAuthenticationRes
  >;
  getRefreshToken: () => Promise<Type.GetRefreshTokenRes>;
}
