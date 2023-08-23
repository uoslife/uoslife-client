import React, {useEffect, useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useConfigContext} from '../hooks/ConfigContext';
import SplashScreen from 'react-native-splash-screen';

import MaintenanceScreen from '../screens/MaintenanceScreen';
import AccountScreen from '../screens/account';
import VerificationScreen from '../screens/account/common/VerificationScreen';
import MainScreen from '../screens/MainScreen';

export type RootStackParamList = {
  Account: undefined;
  AccountVerification: undefined;
  // Main: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStackNavigator: React.FC = () => {
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
      initialRouteName="Account"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Account" component={MainScreen} />
      <Stack.Screen name="AccountVerification" component={VerificationScreen} />
      {/* <Stack.Screen name="Main" component={MainScreen} /> */}
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
