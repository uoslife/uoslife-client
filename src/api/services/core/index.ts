import AuthAPI from './auth/authAPI';
import DeviceAPI from './device/deviceAPI';
import NotificationAPI from './notification/notificationAPI';
import UserAPI from './user/userAPI';
import verificationAPI from './verification/verificationAPI';
import MygradeAPI from './mygrade/mygradeAPI';

const CoreAPI = {
  ...AuthAPI,
  ...DeviceAPI,
  ...NotificationAPI,
  ...UserAPI,
  ...verificationAPI,
  ...MygradeAPI,
};

export default CoreAPI;
