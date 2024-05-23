import 'react-native-reanimated';
import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import codePush from 'react-native-code-push';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import * as Sentry from '@sentry/react-native';
import {SENTRY_DSN_KEY} from '@env';
import {useAtomValue} from 'jotai';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import RootStackNavigator from './navigators/RootStackNavigator';
import NotificationService from './services/notification';
import AnimatedBootSplash from './screens/etc/AnimatedBootSplash';
import toastConfig from './configs/toast/config';
import CustomNavigationContainer from './screens/etc/CustomNavigationContainer';
import bootSplashVisibleAtom from './store/app/bootSplashVisible';
import {SENTRY_DEFAULT_SAMPLE_RATE} from './configs/sentry';

Sentry.init({
  dsn: SENTRY_DSN_KEY,
  sampleRate: SENTRY_DEFAULT_SAMPLE_RATE,
});

const App: React.FC = () => {
  const queryClient = new QueryClient();
  const animatedBootSplashvisible = useAtomValue(bootSplashVisibleAtom);

  useEffect(() => {
    NotificationService.registerMessageHandler();
    NotificationService.onForegroundEvent();
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <CustomNavigationContainer>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <RootStackNavigator />
          {animatedBootSplashvisible && <AnimatedBootSplash />}
          <Toast config={toastConfig} topOffset={60} />
        </CustomNavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

// if (!__DEV__) App = codePush(App);
export default Sentry.wrap(App);
