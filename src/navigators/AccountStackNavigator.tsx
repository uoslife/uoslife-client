import React, {useEffect, useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useConfigContext} from '../hooks/ConfigContext';

import {
  PortalAuthenticationScreen,
  SetNicknameScreen,
  AgreementTermsScreen,
  VerificationScreen,
  SignupScreen,
  MyAccountScreen,
} from '../screens/account';
import SplashScreen from 'react-native-splash-screen';
import MaintenanceScreen from '../screens/MaintenanceScreen';

export type AccountStackParamList = {
  signup: undefined;
  verification: undefined;
  setNickname: undefined;
  agreementTerms: undefined;
  portalAuthentication: undefined;
  myAccount: undefined;
};

const Stack = createStackNavigator<AccountStackParamList>();

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
      initialRouteName="signup"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="signup" component={SignupScreen} />
      <Stack.Screen name="verification" component={VerificationScreen} />
      <Stack.Screen name="setNickname" component={SetNicknameScreen} />
      <Stack.Screen name="agreementTerms" component={AgreementTermsScreen} />
      <Stack.Screen
        name="portalAuthentication"
        component={PortalAuthenticationScreen}
      />
      <Stack.Screen name="myAccount" component={MyAccountScreen} />
    </Stack.Navigator>
  );
};

export default AccountStackNavigator;
