import 'react-native-reanimated';
import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import codePush from 'react-native-code-push';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import * as Sentry from '@sentry/react-native';
import {SENTRY_DSN_KEY} from '@env';
import {useAtom} from 'jotai';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import RootStackNavigator from './navigators/RootStackNavigator';
import NotificationService from './services/notification';
import ConfigContext from './hooks/ConfigContext';
import AnimatedBootSplash from './screens/etc/AnimatedBootSplash';
import toastConfig from './configs/toast/config';
import CustomNavigationContainer from './screens/etc/CustomNavigationContainer';
import bootSplashVisibleAtom from './store/app/bootSplashVisible';

Sentry.init({
  dsn: SENTRY_DSN_KEY,
});

let App: React.FC = () => {
  const [animatedBootSplashvisible, setAnimatedBootSplashVisible] = useAtom(
    bootSplashVisibleAtom,
  );

  useEffect(() => {
    NotificationService.registerMessageHandler();
    NotificationService.onForegroundEvent();
  }, []);
  const queryClient = new QueryClient();

  return (
    <ConfigContext>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <CustomNavigationContainer>
            <StatusBar
              barStyle="dark-content"
              backgroundColor="transparent"
              translucent
            />
            <RootStackNavigator />
            {animatedBootSplashvisible && (
              <AnimatedBootSplash
                onAnimationEnd={() => {
                  setAnimatedBootSplashVisible(false);
                }}
              />
            )}
            <Toast config={toastConfig} topOffset={60} />
          </CustomNavigationContainer>
        </QueryClientProvider>
      </SafeAreaProvider>
    </ConfigContext>
  );
};

if (!__DEV__) App = codePush(App);
export default Sentry.wrap(App);
