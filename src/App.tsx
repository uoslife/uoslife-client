import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootStackNavigator from './navigators/RootStackNavigator';
import {NotificationService} from './services/notification';
import ConfigContext from './hooks/ConfigContext';
import codePush from 'react-native-code-push';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import customBackgroundTheme from './styles/customBackgroundTheme';

let App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    (async () => {
      NotificationService.registerMessageHandler();
      await NotificationService.requestNotificationPermissions();
    })();
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
        </NavigationContainer>
      </SafeAreaProvider>
    </ConfigContext>
  );
};

// if (!__DEV__) App = codePush(App);
export default App;
