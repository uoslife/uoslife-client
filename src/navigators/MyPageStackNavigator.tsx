import React, {useEffect, useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useConfigContext} from '../hooks/ConfigContext';

import {
  MyProfileScreen,
  MyAccountScreen,
  MyAppInformationScreen,
  MyAppSettingScreen,
} from '../screens/myPage';
import SplashScreen from 'react-native-splash-screen';
import MaintenanceScreen from '../screens/MaintenanceScreen';

export type MyPageStackParamList = {
  myProfile: undefined;
  myAccount: undefined;
  myAppSetting: undefined;
  myAppInformation: undefined;
};

const Stack = createStackNavigator<MyPageStackParamList>();

const AccountStackNavigator = () => {
  const {config, isLoading, hasNetworkError} = useConfigContext();

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

  return (
    <Stack.Navigator
      initialRouteName="myProfile"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="myProfile" component={MyProfileScreen} />
      <Stack.Screen name="myAccount" component={MyAccountScreen} />
      <Stack.Screen name="myAppSetting" component={MyAppSettingScreen} />
      <Stack.Screen
        name="myAppInformation"
        component={MyAppInformationScreen}
      />
    </Stack.Navigator>
  );
};

export default AccountStackNavigator;
