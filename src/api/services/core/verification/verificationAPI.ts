import {del, get, post} from '../../../core/methods';
import VerificationService from './verificationAPI.interface';
import * as Type from './verificationAPI.type';

const verificationAPI: VerificationService = {
  portalVerification: params =>
    post<Type.PortalVerificationRes>('core/verification', params),
  getPortalVerification: () =>
    get<Type.GetPortalVerificationRes>('core/verification'),
  deletePortalVerification: () =>
    del<Type.DeletePortalVerificationRes>('core/verification'),
  representativePortalVerification: params =>
    post<Type.RepresentativePortalVerificationRes>(
      'core/verification/representative',
      params,
    ),
};
export default verificationAPI;
