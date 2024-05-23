import {captureMessage} from '@sentry/react-native';
import storage from '../storage';
import DeviceService from './device';
import storeToken from '../utils/storeToken';
import customShowToast from '../configs/toast';
import {DeleteUserInfoType, SetUserInfoType} from '../hooks/useUserState';
import AnalyticsService from './analytics';
import {AccountAPI} from '../api/services/account';
import {JWTTokenType, UserInfoType} from '../api/services/account/type';

type OnRegisterParamsType = JWTTokenType & {
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
   */
  static async onRegister({
    accessToken,
    refreshToken,
    setNotLoggedIn,
    setUserInfo,
  }: OnRegisterParamsType): Promise<void> {
    storeToken({accessToken, refreshToken});
    await Promise.all([
      DeviceService.setDeviceInfoWhenAuthentication(),
      UserService.updateUserInfo(setUserInfo),
    ]);
    if (setNotLoggedIn) return;
    storage.set('isLoggedIn', true);
  }

  static async getUserInfoFromServer(): Promise<UserInfoType> {
    return await AccountAPI.getUserInfo();
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
      await AccountAPI.unregister();
      await AnalyticsService.logAnalyticsEvent('unregister', {
        unregisterUserId: user.id,
      }).finally(() => {
        this.initializeUserState(deleteUserInfo);
        customShowToast('unregisterSuccess');
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

  // JWT 토큰 관리

  /**
   * refresh token 만료시 실행되는 함수로,
   * 로그인 상태를 초기화 하고 로그아웃 시킵니다.
   */
  static async onLoginDurationExpired(): Promise<void> {
    await this.logout({});
    storage.set('isLoggedIn', false);
    customShowToast('loginDurationExpiredInfo');
    captureMessage('user is logged out because of expired refresh token');
  }

  /** refresh token을 이용하여 access token을 가져옵니다. */
  static async getAccessTokenByRefreshToken(): Promise<void> {
    try {
      const res = await AccountAPI.getRefreshToken();
      const {accessToken, refreshToken} = res;
      storeToken({accessToken, refreshToken});
    } catch {
      captureMessage('failed get refresh token');
    }
  }

  /**
   * 서버측 또는 알 수 없는 오류 발생으로 로그아웃을 실행하는 함수입니다.
   * 로그인 상태를 초기화 하고 로그아웃 시킵니다.
   */
  static async logoutByUnknownError(): Promise<void> {
    await this.logout({});
    storage.set('isLoggedIn', false);
    customShowToast('logoutByUnknownError');
  }
}
