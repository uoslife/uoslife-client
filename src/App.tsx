import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import codePush from 'react-native-code-push';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import * as Sentry from '@sentry/react-native';
import {SENTRY_DSN_KEY} from '@env';
import {useAtom} from 'jotai';

import customBackgroundTheme from './styles/customBackgroundTheme';
import RootStackNavigator from './navigators/RootStackNavigator';
import NotificationService from './services/notification';
import ConfigContext from './hooks/ConfigContext';
import AnimatedBootSplash from './screens/etc/AnimatedBootSplash';
import bootSplashVisibleAtom from './store/bootsplash';
import toastConfig from './configs/toast/config';
import linking from './configs/deepLinking';

Sentry.init({
  dsn: SENTRY_DSN_KEY,
});

const App: React.FC = () => {
  const [visible, setVisible] = useAtom(bootSplashVisibleAtom);

  useEffect(() => {
    NotificationService.registerMessageHandler();
    NotificationService.onForegroundEvent();
  }, []);

  return (
    <ConfigContext>
      <SafeAreaProvider>
        <NavigationContainer linking={linking} theme={customBackgroundTheme}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <RootStackNavigator />
          {visible && (
            <AnimatedBootSplash
              onAnimationEnd={() => {
                setVisible(false);
              }}
            />
          )}
          <Toast config={toastConfig} topOffset={60} />
        </NavigationContainer>
      </SafeAreaProvider>
    </ConfigContext>
  );
};

// if (!__DEV__) App = codePush(App);
export default Sentry.wrap(App);
