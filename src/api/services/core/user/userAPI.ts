import {get} from '../../../core/methods';
import UserService from './userAPI.interface';
import * as Type from './userAPI.type';

const UserAPI: UserService = {
  checkDuplicateUserNickname: params =>
    get<Type.CheckDuplicateUserNicknameRes>(
      `core/users/check/${params.nickname}`,
    ),
};
export default UserAPI;
