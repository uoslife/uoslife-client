import {ServiceFunc} from '../../type';
import * as Type from './verificationAPI.type';

export default interface VerificationService {
  portalVerification: ServiceFunc<
    Type.PortalVerificationParams,
    Type.PortalVerificationRes
  >;
  getPortalVerification: ServiceFunc<
    Type.GetPortalVerificationParams,
    Type.GetPortalVerificationRes
  >;
  deletePortalVerification: ServiceFunc<
    Type.DeletePortalVerificationParams,
    Type.DeletePortalVerificationRes
  >;
  representativePortalVerification: ServiceFunc<
    Type.RepresentativePortalVerificationParams,
    Type.RepresentativePortalVerificationRes
  >;
}
