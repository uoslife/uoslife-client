export type SubscribeTopicParams = {
  topicName: 'string';
};

export type SubscribeTopicResponse = {
  topicName: 'string';
};

export type GetUserTopicsParams = {};

export type GetUserTopicsResponse = Array<{
  id: number;
  name: string;
  description: string;
  type: string;
  subscriberCount: number;
}>;
