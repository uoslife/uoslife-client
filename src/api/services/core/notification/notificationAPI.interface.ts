import {ServiceFunc} from '../../type';
import * as Type from './notificationAPI.type';

export default interface NotificationService {
  subscribeTopic: ServiceFunc<
    Type.SubscribeTopicParams,
    Type.SubscribeTopicResponse
  >;
  getUserTopics: ServiceFunc<
    Type.GetUserTopicsParams,
    Type.GetUserTopicsResponse
  >;
}
