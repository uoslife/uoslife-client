import {ServiceFunc} from '../../type';
import * as Type from './verificationAPI.type';

export default interface verificationService {
  portalVerification: ServiceFunc<
    Type.PortalVerificationParams,
    Type.PortalVerificationRes
  >;
}
