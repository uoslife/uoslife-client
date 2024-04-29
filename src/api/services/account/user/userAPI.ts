import {get, post, patch, del} from '../../../core/methods';
import UserService from './userAPI.interface';
import * as Type from './userAPI.type';

const UserAPI: UserService = {
  signIn: params => post<Type.SignInRes>('v1/users', params, 'ACCOUNT'),
  getUserInfo: () => get<Type.GetUserInfoRes>('v1/users/me', 'ACCOUNT'),
  patchUserInfo: params =>
    patch<Type.PatchUserInfoRes>('v1/users/me', params, 'ACCOUNT'),
  unregister: () => del<Type.UnregisterRes>('v1/users/me', 'ACCOUNT'),
};
export default UserAPI;
