import {get, post} from '../../../core/methods';
import UserService from './userAPI.interface';
import * as Type from './userAPI.type';

const UserAPI: UserService = {
  checkDuplicateUserNickname: params =>
    get<Type.CheckDuplicateUserNicknameRes>(
      `core/users/check/${params.nickname}`,
    ),
  getUserInfo: () => get<Type.GetUserInfoRes>(`core/users`),
  changePhone: params => post<Type.ChangePhoneRes>(`core/users/phone`, params),
  changeNickname: params =>
    post<Type.ChangeNicknameRes>(`core/users/nickname`, params),
};
export default UserAPI;
