import {CoreAPI} from '../api/services';
import {GetUserInfoRes} from '../api/services/core/user/userAPI.type';
import {storage} from '../storage';
import {RootNavigationProps} from '../navigators/RootStackNavigator';

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

  static async unregister(navigation: RootNavigationProps): Promise<void> {
    await CoreAPI.unregister({});
    navigation.navigate('Account');
  }

  static getAllUserInfo(): GetUserInfoRes | null {
    const jsonUser = storage.getString('user');
    if (!jsonUser) return null;
    return JSON.parse(jsonUser) as GetUserInfoRes;
  }
  static getUserInfo(item: keyof GetUserInfoRes): string | number {
    const userInfo = this.getAllUserInfo();
    if (userInfo === null) return '';
    return userInfo[item];
  }
  static deleteUserInfo = (): void => {
    storage.delete('access_token');
    storage.delete('refresh_token');
    storage.delete('user');
    storage.delete('user.isLoggedIn');
  };
}
