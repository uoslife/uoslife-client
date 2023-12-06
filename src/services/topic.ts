import {CoreAPI} from '../api/services';
import {GetUserTopicsResponse} from '../api/services/core/notification/notificationAPI.type';

export default class TopicService {
  static async getUserTopics(): Promise<GetUserTopicsResponse | null> {
    try {
      const topicsRes = await CoreAPI.getUserTopics();
      return topicsRes;
    } catch (error) {
      return null;
    }
  }
}
