import React, {useEffect, useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useConfigContext} from '../hooks/ConfigContext';
import SplashScreen from 'react-native-splash-screen';

import MaintenanceScreen from '../screens/MaintenanceScreen';
import AccountScreen from '../screens/account';
import MainScreen from '../screens/MainScreen';
import AnnouncementStackNavigator from './AnnouncementStackNavigator';
import MyPageStackNavigator from './MyPageStackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import LibraryScreen from '../screens/library/LibraryScreen';
import CafeteriaScreen from '../screens/cafeteria/CafeteriaScreen';
import {useAtomValue} from 'jotai';
import {accountStatusAtom} from '../atoms/account';
import useUserInfo from '../hooks/useUserInfo';

export type RootStackParamList = {
  Main: undefined;
  MyPage: undefined;
  Announcement: undefined;
  Library: undefined;
  Cafeteria: undefined;
};

export type RootNavigationProps = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

const RootStackNavigator: React.FC = () => {
  const accountStatus = useAtomValue(accountStatusAtom);
  const {config, isLoading, hasNetworkError} = useConfigContext();
  useUserInfo();

  const isMaintenance = useMemo(
    () => config.get('app.block') !== 'NO',
    [config],
  );

  useEffect(() => {
    if (isLoading) return;
    SplashScreen.hide();
  }, [isLoading]);

  if (isMaintenance) {
    return <MaintenanceScreen hasNetworkError={hasNetworkError} />;
  }

  if (!accountStatus.isLogin) {
    return <AccountScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="MyPage" component={MyPageStackNavigator} />
      <Stack.Screen
        name="Announcement"
        component={AnnouncementStackNavigator}
      />
      <Stack.Screen name="Library" component={LibraryScreen} />
      <Stack.Screen name="Cafeteria" component={CafeteriaScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
