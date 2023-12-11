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
import RootStackNavigator from './navigators/RootStackNavigator';
import NotificationService from './services/notification';
import ConfigContext from './hooks/ConfigContext';
import customBackgroundTheme from './styles/customBackgroundTheme';
import toastConfig from './configs/toast/config';
import AnimatedBootSplash from './screens/etc/AnimatedBootSplash';
import bootSplashVisibleAtom from './store/bootsplash';

Sentry.init({
  dsn: SENTRY_DSN_KEY,
});

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [visible, setVisible] = useAtom(bootSplashVisibleAtom);
  useEffect(() => {
    NotificationService.registerMessageHandler();
  }, []);

  return (
    <ConfigContext>
      <SafeAreaProvider>
        <NavigationContainer theme={customBackgroundTheme}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
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
