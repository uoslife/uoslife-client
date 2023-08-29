import AuthAPI from './auth/authAPI';
import NotificationAPI from './notification/notificationAPI';
import SmsControllerAPI from './sms-controller/smsControllerAPI';
import UserAPI from './user/userAPI';

const CoreAPI = {
  ...AuthAPI,
  ...NotificationAPI,
  ...SmsControllerAPI,
  ...UserAPI,
};

export default CoreAPI;
