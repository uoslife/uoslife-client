import React, {useEffect, useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useConfigContext} from '../hooks/ConfigContext';
import SplashScreen from 'react-native-splash-screen';
import MaintenanceScreen from '../screens/MaintenanceScreen';
import {
  PortalAuthenticationScreen,
  SetNicknameScreen,
  VerificationScreen,
} from '../screens/account';

import {MyAccountScreen} from '../screens/myPage';
import AccountCancellationScreen from '../screens/myPage/AccountCancellationScreen';

export type MyPageAccountStackParamList = {
  myAccount: undefined;
  setNickname: undefined;
  portalAuthentication: undefined;
  verification: undefined;
  accountCancellation: undefined;
};

const Stack = createStackNavigator<MyPageAccountStackParamList>();

const MyPageAccountStackNavigator = () => {
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
      initialRouteName="myAccount"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="myAccount" component={MyAccountScreen} />
      <Stack.Screen name="setNickname" component={SetNicknameScreen} />
      <Stack.Screen
        name="portalAuthentication"
        component={PortalAuthenticationScreen}
      />

      <Stack.Screen name="verification" component={VerificationScreen} />
      <Stack.Screen
        name="accountCancellation"
        component={AccountCancellationScreen}
      />
    </Stack.Navigator>
  );
};

export default MyPageAccountStackNavigator;
