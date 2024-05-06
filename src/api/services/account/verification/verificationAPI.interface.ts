import {ServiceFunc} from '../../type';
import * as Type from './verificationAPI.type';

export default interface VerificationService {
  registerPortalAccount: ServiceFunc<
    Type.RegisterPortalAccountParams,
    Type.RegisterPortalAccountRes
  >;
  getPortalAccount: ServiceFunc<
    Type.GetPortalAccountParams,
    Type.GetPortalAccountRes
  >;
  deletePortalAccount: ServiceFunc<
    Type.DeletePortalAccountParams,
    Type.DeletePortalAccountRes
  >;
}
