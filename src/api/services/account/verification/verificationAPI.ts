import {del, get, post} from '../../../core/methods';
import VerificationService from './verificationAPI.interface';
import * as Type from './verificationAPI.type';

const verificationAPI: VerificationService = {
  registerPortalAccount: params =>
    post<Type.RegisterPortalAccountRes>(
      'v1/verification/portal-account',
      params,
      'ACCOUNT',
    ),
  getPortalAccount: () =>
    get<Type.GetPortalAccountRes>('v1/verification/portal-account', 'ACCOUNT'),
  deletePortalAccount: () =>
    del<Type.DeletePortalAccountRes>(
      'v1/verification/portal-account',
      '',
      'ACCOUNT',
    ),
};
export default verificationAPI;
