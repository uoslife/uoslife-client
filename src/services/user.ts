import {CoreAPI} from '../api/services';
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

  static deleteUserInfo = (): void => {
    storage.delete('access_token');
    storage.delete('refresh_token');
    storage.delete('user');
    storage.delete('user.isLoggedIn');
  };
}
