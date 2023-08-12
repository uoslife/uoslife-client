import React, { useEffect, useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useConfigContext } from '../hooks/ConfigContext';

import {
  MainScreen
} from '../screens/notification';
import SplashScreen from 'react-native-splash-screen';
import MaintenanceScreen from '../screens/MaintenanceScreen';

export type NotificationStackParamList = {
  main: undefined;
};

const Stack = createStackNavigator<NotificationStackParamList>();

const NotificationStackNavigator = () => {
  const { config, isLoading, hasNetworkError } = useConfigContext();

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
      initialRouteName="main"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="main" component={MainScreen} />
    </Stack.Navigator>
  );
};

export default NotificationStackNavigator;
