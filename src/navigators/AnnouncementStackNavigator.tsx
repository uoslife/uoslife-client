import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AnnouncementTempScreen from '../screens/announcement/AnnouncementTempScreen';

export type AnnouncementStackParamList = {
  Announcement: undefined;
};

const Stack = createStackNavigator<AnnouncementStackParamList>();

const AnnouncementStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Announcement"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Announcement" component={AnnouncementTempScreen} />
    </Stack.Navigator>
  );
};

export default AnnouncementStackNavigator;
