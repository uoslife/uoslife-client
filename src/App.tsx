import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootStackNavigator from './navigators/RootStackNavigator';
import {NotificationService} from './services/notification';
import ConfigContext from './hooks/ConfigContext';

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    (async () => {
      NotificationService.registerMessageHandler();
      await NotificationService.requestNotificationPermissions();
    })();
  }, []);

  return (
    <ConfigContext>
      <NavigationContainer>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />
        <RootStackNavigator />
      </NavigationContainer>
    </ConfigContext>
  );
};

export default App;
