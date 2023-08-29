import {get} from '../../../core/methods';
import UserService from './userAPI.interface';
import * as Type from './userAPI.type';

const UserAPI: UserService = {
  checkDuplicateUserNickname: params =>
    get<Type.CheckDuplicateUserNicknameRes>(`api/users/${params.nickname}`),

  getExistedAccountInfo: params =>
    get<Type.GetExistedAccountInfoRes>(`api/users/account/${params.mobile}`),
};
export default UserAPI;
