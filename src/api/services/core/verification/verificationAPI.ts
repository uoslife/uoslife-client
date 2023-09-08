import {post} from '../../../core/methods';
import verificationService from './verificationAPI.interface';
import * as Type from './verificationAPI.type';

const verificationAPI: verificationService = {
  portalVerification: params =>
    post<Type.PortalVerificationRes>('core/verification', params),
};
export default verificationAPI;
