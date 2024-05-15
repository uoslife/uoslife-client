import {ServiceFunc, ServiceFuncWithoutParams} from '../../type';
import * as Type from './verificationAPI.type';

export default interface VerificationService {
  registerPortalAccount: ServiceFunc<
    Type.RegisterPortalAccountParams,
    Type.RegisterPortalAccountRes
  >;
  getPortalAccount: ServiceFuncWithoutParams<Type.GetPortalAccountRes>;
  deletePortalAccount: ServiceFuncWithoutParams<Type.DeletePortalAccountRes>;
}
