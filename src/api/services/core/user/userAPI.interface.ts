import {ServiceFunc} from '../../type';
import * as Type from './userAPI.type';

export default interface UserService {
  checkDuplicateUserNickname: ServiceFunc<
    Type.CheckDuplicateUserNicknameParams,
    Type.CheckDuplicateUserNicknameRes
  >;
  getUserInfo: ServiceFunc<Type.GetUserInfoParams, Type.GetUserInfoRes>;
  changePhone: ServiceFunc<Type.ChangePhoneParams, Type.ChangePhoneRes>;
  changeNickname: ServiceFunc<
    Type.ChangeNicknameParams,
    Type.ChangeNicknameRes
  >;
}
