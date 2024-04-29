import {ServiceFunc} from '../../type';
import * as Type from './userAPI.type';

export default interface UserService {
  signIn: ServiceFunc<Type.SignInParams, Type.SignInRes>;
  getUserInfo: ServiceFunc<Type.GetUserInfoParams, Type.GetUserInfoRes>;
  patchUserInfo: ServiceFunc<Type.PatchUserInfoParams, Type.PatchUserInfoRes>;
  unregister: ServiceFunc<Type.UnregisterParams, Type.UnregisterRes>;
}
