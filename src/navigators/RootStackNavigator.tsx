import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import {NavigatorScreenParams} from '@react-navigation/native';
import {useMMKVListener} from 'react-native-mmkv';

import MaintenanceScreen from '../screens/etc/MaintenanceScreen';
import AnnouncementStackNavigator, {
  AnnouncementStackParamList,
} from './AnnouncementStackNavigator';
import CafeteriaScreen from '../screens/cafeteria/CafeteriaScreen';

import MypageStackNavigator, {
  MypageStackParamList,
} from './MypageStackNavigator';
import RootBottomTapNavigator, {
  RootTabParamList,
} from './RootBottomTapNavigator';

import storage from '../storage';
import {
  PrivacyandPoliciesScreen,
  ToSandPoliciesScreen,
} from '../screens/mypage';
import PortalAuthenticationScreen from '../screens/account/portal_account/PortalAuthenticationScreen';
import AccountScreenContainer from '../screens/account';
import useInitApp from '../hooks/useInitApp';
import LibraryRecapScreen from '../screens/LibraryRecapScreen';
import LibraryStackNavigator from './LibraryStackNavigator';
import {LibraryStackParamList} from './types/library';
import UoslifeMeetingScreen from '../screens/UoslifeMeetingScreen';

export type RootStackParamList = {
  Main: NavigatorScreenParams<RootTabParamList>;
  Mypage: NavigatorScreenParams<MypageStackParamList>;
  Announcement: NavigatorScreenParams<AnnouncementStackParamList>;
  Library: NavigatorScreenParams<LibraryStackParamList>;
  Cafeteria: undefined;
  StudentId_PortalAuthentication: undefined;
  LibraryRecap: undefined;
  UoslifeMeeting: undefined;

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
          <Stack.Screen name="Mypage" component={MypageStackNavigator} />
          <Stack.Screen
            name="Announcement"
            component={AnnouncementStackNavigator}
          />
          <Stack.Screen name="Library" component={LibraryStackNavigator} />
          <Stack.Screen name="Cafeteria" component={CafeteriaScreen} />
          <Stack.Screen
            name="StudentId_PortalAuthentication"
            component={PortalAuthenticationScreen}
          />
          <Stack.Screen name="LibraryRecap" component={LibraryRecapScreen} />
          <Stack.Screen
            name="UoslifeMeeting"
            component={UoslifeMeetingScreen}
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
