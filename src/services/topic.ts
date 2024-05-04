import {CoreAPI} from '../api/services';

export default class TopicService {
  static async setTopicWhenSignUp(isAdvertismentAgreeChecked: boolean) {
    await Promise.all([
      await CoreAPI.subscribeTopic({topicName: 'SERVICE_NOTIFICATION'}),
      isAdvertismentAgreeChecked &&
        (await CoreAPI.subscribeTopic({topicName: 'MARKETING_NOTIFICATION'})),
      await CoreAPI.subscribeTopic({topicName: 'ACADEMIC_ANNOUNCEMENT'}),
      await CoreAPI.subscribeTopic({topicName: 'RECRUIT_ANNOUNCEMENT'}),
      await CoreAPI.subscribeTopic({topicName: 'SERVICE_NOTIFICATION'}),
      await CoreAPI.subscribeTopic({topicName: 'STARTUP_ANNOUNCEMENT'}),
    ]);
  }
}
