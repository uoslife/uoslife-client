import {get} from '../../../core/methods';
import UserService from './userAPI.interface';
import * as Type from './userAPI.type';

const UserAPI: UserService = {
  checkDuplicateUserNickname: params =>
    get<Type.checkDuplicateUserNicknameRes>(`api/users/${params.nickname}`),

  getExistedAccountInfo: params =>
    get<Type.getExistedAccountInfoRes>(`api/users/account/${params.mobile}`),
};
export default UserAPI;
