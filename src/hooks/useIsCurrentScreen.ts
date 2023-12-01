import {useRoute} from '@react-navigation/native';
import {useCallback} from 'react';

const useIsCurrentScreen = (findScreenName: string | string[]) => {
  const route = useRoute();

  const isCurrentScreen = useCallback(() => {
    if (typeof findScreenName === 'string')
      return route.name === findScreenName;
    return findScreenName.some(name => route.name === name);
  }, [findScreenName, route.name]);

  return [isCurrentScreen()];
};

export default useIsCurrentScreen;
