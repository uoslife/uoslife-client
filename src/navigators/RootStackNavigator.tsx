import React, {useEffect, useMemo, useState} from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import SplashScreen from 'react-native-bootsplash';
import {NavigatorScreenParams} from '@react-navigation/native';
import {useMMKVListener} from 'react-native-mmkv';
import {useConfigContext} from '../hooks/ConfigContext';

import MaintenanceScreen from '../screens/MaintenanceScreen';
import AnnouncementStackNavigator from './AnnouncementStackNavigator';
import MyPageStackNavigator from './MyPageStackNavigator';
import LibraryScreen from '../screens/library/LibraryScreen';
import CafeteriaScreen from '../screens/cafeteria/CafeteriaScreen';
import AccountStackNavigator from './AccountStackNavigator';
import RootBottomTapNavigator, {
  RootTabParamList,
} from './RootBottomTapNavigator';
import UserService from '../services/user';
import NotificationService from '../services/notification';
import DeviceService from '../services/device';
import storage from '../storage';

export type RootStackParamList = {
  Account: undefined;
  Main: NavigatorScreenParams<RootTabParamList>;
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isMaintenance = useMemo(
    () => config.get('app.block') !== 'NO',
    [config],
  );

  const setLoadingFinish = () => {
    setIsServiceInitLoading(false);
  };

  const setAuthenticationSuccess = () => {
    storage.set('isLoggedIn', true);
    setIsLoggedIn(true);
    setLoadingFinish();
  };

  useEffect(() => {
    (async () => {
      await NotificationService.requestNotificationPermissions();
      await NotificationService.handleFirebasePushToken();

      const hasRefreshToken = UserService.getHasRefreshToken();
      if (!hasRefreshToken) {
        setLoadingFinish();
        return;
      }

      const userInfo = await UserService.getUserInfoFromServer();
      if (!userInfo) {
        setLoadingFinish();
        return;
      }
      UserService.setUserInfoToDevice(userInfo);

      await DeviceService.updateDeviceInfo();
      setAuthenticationSuccess();
    })();
  }, []);

  useEffect(() => {
    if (isLoading || isServiceInitLoading) return;
    (async () => await SplashScreen.hide())();
  }, [isLoading, isServiceInitLoading]);

  /** isLoggedIn value를 감시합니다. */
  useMMKVListener(changedKey => {
    if (changedKey !== 'isLoggedIn') return;
    setIsLoggedIn(storage.getBoolean(changedKey) ?? false);
  }, storage);

  if (isMaintenance) {
    return <MaintenanceScreen hasNetworkError={hasNetworkError} />;
  }
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Main"
            component={RootBottomTapNavigator}
            options={{animationEnabled: false}}
          />
          <Stack.Screen name="MyPage" component={MyPageStackNavigator} />
          <Stack.Screen
            name="Announcement"
            component={AnnouncementStackNavigator}
          />
          <Stack.Screen name="Library" component={LibraryScreen} />
          <Stack.Screen name="Cafeteria" component={CafeteriaScreen} />
        </>
      ) : (
        <Stack.Screen name="Account" component={AccountStackNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
