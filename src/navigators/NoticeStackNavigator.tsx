import React, {useEffect, useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useConfigContext} from '../hooks/ConfigContext';

import {NoticeMainScreen} from '../screens/notice';
import SplashScreen from 'react-native-splash-screen';
import MaintenanceScreen from '../screens/MaintenanceScreen';

export type NoticeStackParamList = {
  main: undefined;
};

const Stack = createStackNavigator<NoticeStackParamList>();

const NoticeStackNavigator = () => {
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
      initialRouteName="main"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="main" component={NoticeMainScreen} />
    </Stack.Navigator>
  );
};

export default NoticeStackNavigator;
