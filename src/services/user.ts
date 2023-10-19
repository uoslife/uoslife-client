import {DevSettings} from 'react-native';
import {CoreAPI} from '../api/services';
import {UserInfoType} from '../api/services/core/user/userAPI.type';
import {storage} from '../storage';

export class UserService {
  static async setUserInfo(): Promise<void> {
    const userInfo = await CoreAPI.getUserInfo({});
    storage.set('user', JSON.stringify(userInfo));
  }
  static async logout(): Promise<void> {
    // await CoreAPI.logout({}); // TODO: logout API 호출하도록 변경
    this.deleteUserInfo();
    console.log(storage.getAllKeys());
  }

  static async unregister(): Promise<void> {
    await CoreAPI.unregister({});
    DevSettings.reload();
  }

  static getAllUserInfo(): UserInfoType | null {
    const jsonUser = storage.getString('user');
    if (!jsonUser) return null;
    return JSON.parse(jsonUser) as UserInfoType;
  }
  static getUserInfo(
    item: keyof UserInfoType,
  ): UserInfoType[keyof UserInfoType] {
    const userInfo = this.getAllUserInfo();
    if (userInfo === null) return null;
    return userInfo[item];
  }
  static deleteUserInfo = (): void => {
    storage.delete('access_token');
    storage.delete('refresh_token');
    storage.delete('user');
    storage.delete('user.isLoggedIn');
  };
}
