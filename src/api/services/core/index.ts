import AuthAPI from './auth/authAPI';
import DeviceAPI from './device/deviceAPI';
import NotificationAPI from './notification/notificationAPI';
import UserAPI from './user/userAPI';
import verificationAPI from './verification/verificationAPI';

const CoreAPI = {
  ...AuthAPI,
  ...DeviceAPI,
  ...NotificationAPI,
  ...UserAPI,
  ...verificationAPI,
};

export default CoreAPI;
