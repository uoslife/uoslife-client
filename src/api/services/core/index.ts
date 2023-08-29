import AuthAPI from './auth/authAPI';
import NotificationAPI from './notification/notificationAPI';
import SmsControllerAPI from './sms-controller/smsControllerAPI';
import UserAPI from './user/userAPI';
import verificationAPI from './verification/verificationAPI';

const CoreAPI = {
  ...AuthAPI,
  ...NotificationAPI,
  ...SmsControllerAPI,
  ...UserAPI,
  ...verificationAPI,
};

export default CoreAPI;
