import {CoreAPI} from '../api/services';
import {UserInfoType} from '../api/services/core/user/userAPI.type';
import storage from '../storage';
import DeviceService from './device';
import storeToken from '../utils/storeToken';
import customShowToast from '../configs/toast';
import {DeleteUserInfoType, SetUserInfoType} from '../hooks/useUserState';
import AnalyticsService from './analytics';

type OnRegisterParamsType = {
  accessToken: string;
  refreshToken: string;
  setUserInfo: SetUserInfoType;
  /** 바로 로그인하지 않을 때 사용하는 params입니다. */
  setNotLoggedIn?: true;
};
type InitializeUserParamsType = {
  deleteUserInfo: DeleteUserInfoType;
  user: UserInfoType;
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

  static async logout({
    deleteUserInfo,
    user,
  }: Partial<InitializeUserParamsType>): Promise<void> {
    if (!deleteUserInfo || !user) {
      this.initializeUserState(undefined);
      return;
    }
    await AnalyticsService.logAnalyticsEvent('logout', {
      logoutUserId: user.id,
    }).finally(() => {
      this.initializeUserState(deleteUserInfo);
      customShowToast('logout');
    });
  }

  static async unregister({
    deleteUserInfo,
    user,
  }: InitializeUserParamsType): Promise<void> {
    try {
      await CoreAPI.unregister();
      await AnalyticsService.logAnalyticsEvent('unregister', {
        unregisterUserId: user.id,
      }).finally(() => {
        this.initializeUserState(deleteUserInfo);
        customShowToast('unregister');
      });
    } catch (error) {
      customShowToast('unregisterError');
    }
  }

  static initializeUserState(
    deleteUserInfo: DeleteUserInfoType | undefined,
  ): void {
    storage.delete('accessToken');
    storage.delete('refreshToken');
    storage.delete('tempToken');
    if (deleteUserInfo) deleteUserInfo();
    storage.set('isLoggedIn', false);
  }
}
