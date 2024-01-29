import AuthAPI from './auth/authAPI';
import DeviceAPI from './device/deviceAPI';
import NotificationAPI from './notification/notificationAPI';
import UserAPI from './user/userAPI';
import verificationAPI from './verification/verificationAPI';
import MygradeAPI from './mygrade/mygradeAPI';
import LibraryHistoryAPI from './libraryHistory/libraryHistoryAPI';

const CoreAPI = {
  ...AuthAPI,
  ...DeviceAPI,
  ...NotificationAPI,
  ...UserAPI,
  ...verificationAPI,
  ...MygradeAPI,
  ...LibraryHistoryAPI,
};

export default CoreAPI;
