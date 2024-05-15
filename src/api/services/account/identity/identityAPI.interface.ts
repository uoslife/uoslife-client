import {ServiceFunc, ServiceFuncWithoutParams} from '../../type';
import * as Type from './identityAPI.type';

export default interface IdentityService {
  getIdentities: ServiceFuncWithoutParams<Type.GetIdentitiesRes>;
  selectIdentity: ServiceFunc<
    Type.SelectIdentityParams,
    Type.SelectIdentityRes
  >;
}
