import {CoreAPI} from '../api/services';
import {UserInfoType} from '../api/services/core/user/userAPI.type';
import storage from '../storage';
import DeviceService from './device';
import storeToken from '../utils/storeToken';

type OnRegisterParamsType = {
  accessToken: string;
  refreshToken: string;
  /** 바로 로그인하지 않을 때 사용하는 params입니다. */
  setNotLoggedIn?: true;
};

export default class UserService {
  static getHasRefreshToken(): boolean {
    return !!storage.getString('refreshToken');
  }

  /**
   * SingIn 또는 SingUp시 실행되는 함수입니다.
   *  @return Promise<void>
   * */
  static async onRegister(params: OnRegisterParamsType): Promise<void> {
    storeToken(params.accessToken, params.refreshToken);
    await DeviceService.setDeviceInfo();
    await UserService.setUserInfoToClient();
    if (params.setNotLoggedIn) return;
    storage.set('isLoggedIn', true);
  }

  static async getUserInfoFromServer(): Promise<UserInfoType | null> {
    try {
      const userInfo = await CoreAPI.getUserInfo({});
      return userInfo;
    } catch (error) {
      return null;
    }
  }

  static async setUserInfoToClient(): Promise<void> {
    const userInfo = await this.getUserInfoFromServer();
    storage.set('user', JSON.stringify(userInfo));
  }

  // 로그아웃 및 회원 탈퇴

  static async logout(): Promise<void> {
    // await CoreAPI.logout({}); // TODO: logout API 호출하도록 변경
    this.deleteUserInfo();
  }

  static async unregister(): Promise<void> {
    await CoreAPI.unregister({});
    this.deleteUserInfo();
  }

  static deleteUserInfo = (): void => {
    storage.delete('accessToken');
    storage.delete('refreshToken');
    storage.delete('user');
    storage.set('isLoggedIn', false);
  };

  // Device에서 유저 정보 조회

  static getAllUserInfoFromDevice(): UserInfoType | null {
    const jsonUser = storage.getString('user');
    if (!jsonUser) return null;
    return JSON.parse(jsonUser) as UserInfoType;
  }

  static getUserInfoFromDevice(
    item: keyof UserInfoType,
  ): UserInfoType[keyof UserInfoType] {
    const userInfo = this.getAllUserInfoFromDevice();
    if (userInfo === null) return null;
    return userInfo[item];
  }
}
