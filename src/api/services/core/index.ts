import AuthAPI from './auth/authAPI';
import NotificationAPI from './notification/notificationAPI';
import UserAPI from './user/userAPI';
import verificationAPI from './verification/verificationAPI';

const CoreAPI = {
  ...AuthAPI,
  ...NotificationAPI,
  ...UserAPI,
  ...verificationAPI,
};

export default CoreAPI;
