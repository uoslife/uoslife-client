import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AnnouncementMainScreen from '../screens/announcement/AnnouncementMainScreen';
import AnnouncementDetailScreen from '../screens/announcement/AnnouncementDetailScreen';
import AnnouncementBookmarkScreen from '../screens/announcement/AnnouncementBookmarkScreen';
import AnnouncementSearchScreen from '../screens/announcement/AnnouncementSearchScreen';

export type AnnouncementStackParamList = {
  Announcement_main: undefined;
  Announcement_detail: undefined;
  Announcement_bookmark: undefined;
  Announcement_search: undefined;
};

const Stack = createStackNavigator<AnnouncementStackParamList>();

const AnnouncementStackNavigator = () => {
  return (
    <Stack.Navigator
    initialRouteName="Announcement_main"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Announcement_main" component={AnnouncementMainScreen} />
    <Stack.Screen name="Announcement_detail" component={AnnouncementDetailScreen} />
    <Stack.Screen name="Announcement_bookmark" component={AnnouncementBookmarkScreen} />
    <Stack.Screen name="Announcement_search" component={AnnouncementSearchScreen} />
    </Stack.Navigator>
  );
};

export default AnnouncementStackNavigator;
