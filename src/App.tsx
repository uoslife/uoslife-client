import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import RootStackNavigator from './navigators/RootStackNavigator';
import {NotificationService} from './services/notification';
import ConfigContext from './hooks/ConfigContext';
import codePush from 'react-native-code-push';
import AccountStackNavigator from './navigators/AccountStackNavigator';
import NotificationStackNavigator from './navigators/NotifacationStackNavigator';
import useModal from './hooks/useModal';
import useBottomSheet from './hooks/useBottomSheet';

let App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {Modal} = useModal();
  const {BottomSheet} = useBottomSheet();

  useEffect(() => {
    (async () => {
      NotificationService.registerMessageHandler();
      await NotificationService.requestNotificationPermissions();
    })();
  }, []);

  return (
    <>
      <ConfigContext>
        <NavigationContainer>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor="transparent"
            translucent
          />
          {/* <RootStackNavigator /> */}
          <AccountStackNavigator />
          {/* <NotificationStackNavigator /> */}
        </NavigationContainer>
      </ConfigContext>
    </>
  );
};

if (!__DEV__) App = codePush(App);
export default App;
