import {post} from '../../../core/methods';
import NotificationService from './notificationAPI.interface';
import * as Type from './notificationAPI.type';

const NotificationAPI: NotificationService = {
  sendNotification: body =>
    post<Type.sendNotificationResponse>('api/notification', body),

  sendNotificationWithToken: body =>
    post<Type.sendNotificationWithTokenResponse>(
      'api/notification/token',
      body,
    ),
};
export default NotificationAPI;
