import {del, get, post} from '../../../core/methods';
import NotificationService from './notificationAPI.interface';
import * as Type from './notificationAPI.type';

const NotificationAPI: NotificationService = {
  subscribeTopic: params =>
    post<Type.SubscribeTopicResponse>(
      'core/notification/subscriptions',
      params,
    ),
  unSubscribeTopic: params =>
    del<Type.UnSubscribeTopicResponse>(
      'core/notification/subscriptions',
      params,
    ),
  getUserTopics: () => get<Type.GetUserTopicsResponse>('core/topics/user'),
};
export default NotificationAPI;
