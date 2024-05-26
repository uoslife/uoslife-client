import React, {useEffect, useRef} from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';

import {useAtomValue} from 'jotai';
import {RootStackParamList} from '../navigators/RootStackNavigator';
import customBackgroundTheme from '../styles/customBackgroundTheme';
import initLoadingAtom from '../store/app/initLoading';
import linking from '../configs/deeplink/deepLinking';

type Props = Pick<Parameters<typeof NavigationContainer>[0], 'children'>;

const CustomNavigationContainer = ({children}: Props) => {
  const routeNameRef = useRef<string>();
  const navigationRef = useNavigationContainerRef<RootStackParamList>();
  const isInitLoadingFinish = useAtomValue(initLoadingAtom);
  useEffect(() => {
    if (!isInitLoadingFinish) return;
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;
    (async () => {
      await analytics().logScreenView({
        screen_name: currentRouteName,
        screen_class: currentRouteName,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitLoadingFinish]);

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      theme={customBackgroundTheme}
      onReady={() => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        if (!isInitLoadingFinish) return;

        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;
        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}>
      {children}
    </NavigationContainer>
  );
};

export default CustomNavigationContainer;
