import {ServiceFunc} from '../../type';
import * as Type from './userAPI.type';

export default interface UserService {
  checkDuplicateUserNickname: ServiceFunc<
    Type.CheckDuplicateUserNicknameParams,
    Type.CheckDuplicateUserNicknameRes
  >;
}
