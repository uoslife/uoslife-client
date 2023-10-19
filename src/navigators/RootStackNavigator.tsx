import React, {useEffect, useMemo, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useConfigContext} from '../hooks/ConfigContext';
import SplashScreen from 'react-native-splash-screen';

import MaintenanceScreen from '../screens/MaintenanceScreen';
import AccountScreen from '../screens/account';
import AnnouncementStackNavigator from './AnnouncementStackNavigator';
import MyPageStackNavigator from './MyPageStackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import LibraryScreen from '../screens/library/LibraryScreen';
import CafeteriaScreen from '../screens/cafeteria/CafeteriaScreen';
import {useAtomValue} from 'jotai';
import RootBottomTapNavigator from './RootBottomTapNavigator';
import {UserService} from '../services/user';
import {NotificationService} from '../services/notification';
import {useUserStatus, userStatusAtom} from '../atoms/user';
import {DeviceService} from '../services/device';

export type RootStackParamList = {
  Account: undefined;
  Main: undefined;
  MyPage: undefined;
  Announcement: undefined;
  Library: undefined;
  Cafeteria: undefined;
};

export type RootNavigationProps = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

const RootStackNavigator: React.FC = () => {
  const {config, isLoading, hasNetworkError} = useConfigContext();
  const [isServiceInitLoading, setIsServiceInitLoading] = useState(true);
  const userStatus = useAtomValue(userStatusAtom);
  const {setIsLoggedIn} = useUserStatus();

  const isMaintenance = useMemo(
    () => config.get('app.block') !== 'NO',
    [config],
  );

  useEffect(() => {
    (async () => {
      await NotificationService.setFirebasePushToken();
      await UserService.setUserInfo(() => setIsLoggedIn(true)).finally(() => {
        setIsServiceInitLoading(false);
      });
      await DeviceService.updateDeviceInfo(); // TODO: patch Device API 문제 해결되면 주석 해제
    })();
  }, []);

  useEffect(() => {
    if (isLoading || isServiceInitLoading) return;
    SplashScreen.hide();
  }, [isLoading, isServiceInitLoading]);

  if (isMaintenance) {
    return <MaintenanceScreen hasNetworkError={hasNetworkError} />;
  }
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{headerShown: false}}>
      {userStatus.isLoggedIn ? (
        <>
          <Stack.Screen name="Main" component={RootBottomTapNavigator} />
          <Stack.Screen name="MyPage" component={MyPageStackNavigator} />
          <Stack.Screen
            name="Announcement"
            component={AnnouncementStackNavigator}
          />
          <Stack.Screen name="Library" component={LibraryScreen} />
          <Stack.Screen name="Cafeteria" component={CafeteriaScreen} />
        </>
      ) : (
        <Stack.Screen name="Account" component={AccountScreen} />
      )}
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
