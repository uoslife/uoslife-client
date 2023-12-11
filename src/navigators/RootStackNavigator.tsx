import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import {NavigatorScreenParams} from '@react-navigation/native';
import {useMMKVListener} from 'react-native-mmkv';

import MaintenanceScreen from '../screens/etc/MaintenanceScreen';
import AnnouncementStackNavigator from './AnnouncementStackNavigator';
import LibraryScreen from '../screens/library/LibraryScreen';
import CafeteriaScreen from '../screens/cafeteria/CafeteriaScreen';

import MyPageStackNavigator from './MyPageStackNavigator';
import RootBottomTapNavigator, {
  RootTabParamList,
} from './RootBottomTapNavigator';

import storage from '../storage';
import {
  PrivacyandPoliciesScreen,
  ToSandPoliciesScreen,
} from '../screens/myPage';
import PortalAuthenticationScreen from '../screens/account/common/PortalAuthenticationScreen';
import AccountScreenContainer from '../screens/account';
import useInitApp from '../hooks/useInitApp';

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
  const {hasNetworkError, isMaintenance, isLoggedIn, setIsLoggedIn} =
    useInitApp();

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
