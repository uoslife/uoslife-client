import {post} from '../../../core/methods';
import SmsControllerService from './smsControllerAPI.interface';
import * as Type from './smsControllerAPI.type';

const SmsControllerAPI: SmsControllerService = {
  sendSmsVerification: body =>
    post<Type.sendSmsVerificationRes>('core/sms/verification', body),

  checkSmsVerification: body =>
    post<Type.checkSmsVerificationRes>('core/sms/verification/check', body),
};
export default SmsControllerAPI;
