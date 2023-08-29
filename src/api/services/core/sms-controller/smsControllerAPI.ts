import {post} from '../../../core/methods';
import NotificationService from './smsControllerAPI.interface';
import * as Type from './smsControllerAPI.type';

const SmsControllerAPI: NotificationService = {
  sendSmsVerification: body =>
    post<Type.sendSmsVerificationRes>('core/sms/verification', body),

  checkSmsVerification: body =>
    post<Type.checkSmsVerificationRes>('core/sms/verification/check', body),
};
export default SmsControllerAPI;
