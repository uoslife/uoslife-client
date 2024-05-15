import {useEffect, useState} from 'react';
import {useAtom} from 'jotai';
import {useQuery} from '@tanstack/react-query';
import topicAtom, {TopicName} from '../store/topic';
import {CoreAPI} from '../api/services';
import customShowToast from '../configs/toast/index';
import DeviceService from '../services/device';

const useTopicState = () => {
  const [topicList, setTopicList] = useAtom(topicAtom);
  const [isLoading, setIsLoading] = useState(false);

  const {data, isFetching} = useQuery({
    queryKey: ['topic'],
    queryFn: () => CoreAPI.getUserTopics(),
  });

  useEffect(() => {
    setIsLoading(isFetching);
    if (!isFetching)
      setTopicList(prev => {
        return prev.map(item =>
          data?.some(topic => topic.name === item.name)
            ? {...item, isToggleOn: true}
            : item,
        );
      });
    setIsLoading(false);
  }, [data, isFetching, setTopicList]);

  const setTopic = async (topicName: TopicName) => {
    if (topicName === 'SERVICE_NOTIFICATION')
      await DeviceService.updateDeviceInfo();
    try {
      await CoreAPI.subscribeTopic({topicName});
      setTopicList(prev => {
        return prev.map(item =>
          item.name === topicName ? {...item, isToggleOn: true} : item,
        );
      });
    } catch (error) {
      customShowToast('notificationError');
    }
  };

  const deleteTopic = async (topicName: TopicName) => {
    try {
      await CoreAPI.unSubscribeTopic({topicName});
      setTopicList(prev => {
        return prev.map(item =>
          item.name === topicName ? {...item, isToggleOn: false} : item,
        );
      });
    } catch (error) {
      customShowToast('notificationError');
    }
  };

  return {topicList, setTopic, deleteTopic, isLoading};
};

export default useTopicState;
