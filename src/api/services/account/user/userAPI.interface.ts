import {ServiceFunc, ServiceFuncWithoutParams} from '../../type';
import * as Type from './userAPI.type';

export default interface UserService {
  signUp: ServiceFunc<Type.SignUpParams, Type.SignUpRes>;
  getUserInfo: ServiceFuncWithoutParams<Type.GetUserInfoRes>;
  patchUserInfo: ServiceFunc<Type.PatchUserInfoParams, Type.PatchUserInfoRes>;
  unregister: ServiceFuncWithoutParams<Type.UnregisterRes>;
}
