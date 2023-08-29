import NotificationAPI from './notification/notificationAPI';
import SmsControllerAPI from './sms-controller/smsControllerAPI';

const CoreAPI = {...NotificationAPI, ...SmsControllerAPI};

export default CoreAPI;
