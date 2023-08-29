import {ServiceFunc} from '../../type';
import * as Type from './smsControllerAPI.type';

export default interface SmsControllerService {
  sendSmsVerification: ServiceFunc<
    Type.sendSmsVerificationParams,
    Type.sendSmsVerificationRes
  >;
  checkSmsVerification: ServiceFunc<
    Type.checkSmsVerificationParams,
    Type.checkSmsVerificationRes
  >;
}
