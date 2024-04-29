import {AuthTokenDefaultRes} from '../type';

export type RequestSMSAuthenticationParams = {
  phoneNumber: string;
};
export type RequestSMSAuthenticationRes = {
  expiresAt: string;
  effectiveSeconds: number;
};
export type VerifySMSAuthenticationParams = {
  phoneNumber: string;
  code: string;
};
export type VerifySMSAuthenticationRes = AuthTokenDefaultRes;

export type GetRefreshTokenRes = AuthTokenDefaultRes;
