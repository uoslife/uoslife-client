import {ServiceFunc} from '../../type';
import * as Type from './userAPI.type';

export default interface UserService {
  checkDuplicateUserNickname: ServiceFunc<
    Type.checkDuplicateUserNicknameParams,
    Type.checkDuplicateUserNicknameRes
  >;
  getExistedAccountInfo: ServiceFunc<
    Type.getExistedAccountInfoParams,
    Type.getExistedAccountInfoRes
  >;
}
