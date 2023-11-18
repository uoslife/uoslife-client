import React, {useEffect, useMemo, useState} from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import {NavigatorScreenParams} from '@react-navigation/native';
import {useConfigContext} from '../hooks/ConfigContext';

import MaintenanceScreen from '../screens/MaintenanceScreen';
import AnnouncementStackNavigator from './AnnouncementStackNavigator';
import LibraryScreen from '../screens/library/LibraryScreen';
import CafeteriaScreen from '../screens/cafeteria/CafeteriaScreen';

import MyPageStackNavigator from './MyPageStackNavigator';
import RootBottomTapNavigator, {
  RootTabParamList,
} from './RootBottomTapNavigator';

import UserService from '../services/user';
import NotificationService from '../services/notification';
import DeviceService from '../services/device';
import storage from '../storage';
import {
  PrivacyandPoliciesScreen,
  ToSandPoliciesScreen,
} from '../screens/myPage';
import PortalAuthenticationScreen from '../screens/account/portalAuthScreenContainer/PortalAuthenticationScreen';
import AccountScreenContainer from '../screens/account';

export type RootStackParamList = {
  Main: NavigatorScreenParams<RootTabParamList>;
  MyPage: undefined;
  Announcement: undefined;
  Library: undefined;
  Cafeteria: undefined;
  StudentId_PortalAuthentication: undefined;

  Account: undefined;
  Account_ToSandPolicies: undefined;
  Account_privacyPolicies: undefined;
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

  useEffect(() => {
    (async () => {
      await NotificationService.setFirebasePushToken();
      const hasRefreshToken = UserService.getHasRefreshToken();
      if (!hasRefreshToken) {
        setIsServiceInitLoading(false);
        return null;
      }
      await UserService.setUserInfoToClient();
      await DeviceService.updateDeviceInfo();
      storage.set('isLoggedIn', true);
      setIsLoggedIn(true);
      const showSplashScreenTerm = setTimeout(() => {
        setIsServiceInitLoading(false);
      }, 500);

      return () => clearTimeout(showSplashScreenTerm);
    })();
  }, []);

  useEffect(() => {
    if (isLoading || isServiceInitLoading) return;
    SplashScreen.hide();
  }, [isLoading, isServiceInitLoading]);

  /** isLoggedIn value를 감시합니다. */
  useEffect(() => {
    storage.addOnValueChangedListener(changedKey => {
      if (changedKey !== 'isLoggedIn') return;
      setIsLoggedIn(storage.getBoolean(changedKey) ?? false);
    });
  }, []);

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
          <Stack.Screen
            name="StudentId_PortalAuthentication"
            component={PortalAuthenticationScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Account" component={AccountScreenContainer} />
          <Stack.Screen
            name="Account_ToSandPolicies"
            component={ToSandPoliciesScreen}
          />
          <Stack.Screen
            name="Account_privacyPolicies"
            component={PrivacyandPoliciesScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
