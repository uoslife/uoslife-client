import {ServiceFunc} from '../../type';
import * as Type from './notificationAPI.type';

export default interface NotificationService {
  sendNotification: ServiceFunc<
    Type.SendNotificationParams,
    Type.sendNotificationResponse
  >;
  sendNotificationWithToken: ServiceFunc<
    Type.sendNotificationWithTokenParams,
    Type.sendNotificationWithTokenResponse
  >;
}
