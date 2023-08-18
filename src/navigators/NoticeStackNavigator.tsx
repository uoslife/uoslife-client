import React, {useEffect, useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useConfigContext} from '../hooks/ConfigContext';

import SplashScreen from 'react-native-splash-screen';
import MaintenanceScreen from '../screens/MaintenanceScreen';
import NoticeTempScreen from '../screens/notice/NoticeTempScreen';

export type NoticeStackParamList = {
  Notice: undefined;
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
      initialRouteName="Notice"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Notice" component={NoticeTempScreen} />
    </Stack.Navigator>
  );
};

export default NoticeStackNavigator;
