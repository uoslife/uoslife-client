import React from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import AnnouncementMainScreen from '../screens/announcement/AnnouncementMainScreen';
import AnnouncementDetailScreen from '../screens/announcement/AnnouncementDetailScreen';
import AnnouncementBookmarkBoxScreen from '../screens/announcement/AnnouncementBookmarkBoxScreen';
import AnnouncementSearchScreen from '../screens/announcement/AnnouncementSearchScreen';

export type AnnouncementStackParamList = {
  AnnouncementMain: undefined;
  AnnouncementBookmark: undefined;
  AnnouncementDetail: {id: string};
  AnnouncementSearchWindow: {prevSearchWord?: string};
  AnnouncementSearchResult: {searchWord: string};
  AnnouncementSearch: undefined;
};

export type AnnouncementNavigationProps =
  StackNavigationProp<AnnouncementStackParamList>;

const Stack = createStackNavigator<AnnouncementStackParamList>();

const AnnouncementStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AnnouncementMain"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="AnnouncementMain"
        component={AnnouncementMainScreen}
      />
      <Stack.Screen
        name="AnnouncementDetail"
        component={AnnouncementDetailScreen}
      />
      <Stack.Screen
        name="AnnouncementBookmark"
        component={AnnouncementBookmarkBoxScreen}
      />
      <Stack.Screen
        name="AnnouncementSearch"
        component={AnnouncementSearchScreen}
      />
    </Stack.Navigator>
  );
};

export default AnnouncementStackNavigator;
