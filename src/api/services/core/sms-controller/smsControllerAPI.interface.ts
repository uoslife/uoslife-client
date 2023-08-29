import {ServiceFunc} from '../../type';
import * as Type from './smsControllerAPI.type';

export default interface SmsControllerService {
  sendSmsVerification: ServiceFunc<
    Type.SendSmsVerificationParams,
    Type.SendSmsVerificationRes
  >;
  checkSmsVerification: ServiceFunc<
    Type.CheckSmsVerificationParams,
    Type.CheckSmsVerificationRes
  >;
}
