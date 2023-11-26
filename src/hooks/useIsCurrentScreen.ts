import {useRoute} from '@react-navigation/native';
import {useCallback} from 'react';

const useIsCurrentScreen = (findScreenName: string) => {
  const route = useRoute();

  const isCurrentScreen = useCallback(() => {
    return route.name === findScreenName;
  }, [findScreenName, route.name]);

  return [isCurrentScreen()];
};

export default useIsCurrentScreen;
