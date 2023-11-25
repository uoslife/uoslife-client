import {CoreAPI} from '../api/services';
import {UserInfoType} from '../api/services/core/user/userAPI.type';
import storage from '../storage';
import DeviceService from './device';
import storeToken from '../utils/storeToken';
import customShowToast from '../configs/toast';
import {DeleteUserInfoType, SetUserInfoType} from '../hooks/useUserState';

type OnRegisterParamsType = {
  accessToken: string;
  refreshToken: string;
  setUserInfo: SetUserInfoType;
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
  static async onRegister({
    accessToken,
    refreshToken,
    setNotLoggedIn,
    setUserInfo,
  }: OnRegisterParamsType): Promise<void> {
    storeToken({accessToken, refreshToken});
    await DeviceService.setDeviceInfo();
    await UserService.updateUserInfo(setUserInfo);
    if (setNotLoggedIn) return;
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

  static async updateUserInfo(setUserInfo: SetUserInfoType): Promise<void> {
    const userInfo = await this.getUserInfoFromServer();
    if (!userInfo) return;
    setUserInfo(userInfo);
  }

  // 로그아웃 및 회원 탈퇴

  static async logout(deleteUserInfo: DeleteUserInfoType): Promise<void> {
    this.initializeUserState(deleteUserInfo);
    customShowToast('logout');
  }

  static async unregister(deleteUserInfo: DeleteUserInfoType): Promise<void> {
    try {
      await CoreAPI.unregister();
      this.initializeUserState(deleteUserInfo);
      customShowToast('unregister');
    } catch (error) {
      customShowToast('unregisterError');
    }
  }

  static initializeUserState(deleteUserInfo: DeleteUserInfoType): void {
    storage.delete('accessToken');
    storage.delete('refreshToken');
    storage.delete('tempToken');
    deleteUserInfo();
    storage.set('isLoggedIn', false);
  }
}
