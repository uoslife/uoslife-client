import {TopicName} from '../../../../store/topic';

export type SubscribeTopicParams = {
  topicName: TopicName;
};

export type SubscribeTopicResponse = {
  topicName: TopicName;
};
export type UnSubscribeTopicParams = {
  topicName: TopicName;
};

export type UnSubscribeTopicResponse = {
  topicName: TopicName;
};

export type GetUserTopicsResponse = Array<{
  id: number;
  name: TopicName;
  description: string;
  type: string;
  subscriberCount: number;
}>;
