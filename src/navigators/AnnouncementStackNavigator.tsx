import React, {useEffect, useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useConfigContext} from '../hooks/ConfigContext';

import SplashScreen from 'react-native-splash-screen';
import MaintenanceScreen from '../screens/MaintenanceScreen';
import AnnouncementTempScreen from '../screens/announcement/AnnouncementTempScreen';

export type AnnouncementStackParamList = {
  Announcement: undefined;
};

const Stack = createStackNavigator<AnnouncementStackParamList>();

const AnnouncementStackNavigator = () => {
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
      initialRouteName="Announcement"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Announcement" component={AnnouncementTempScreen} />
    </Stack.Navigator>
  );
};

export default AnnouncementStackNavigator;
