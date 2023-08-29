import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AnnouncementMainScreen from '../screens/announcement/AnnouncementMainScreen';
import AnnouncementDetailScreen from '../screens/announcement/AnnouncementDetailScreen';
import AnnoucementSearchContainerScreen from '../screens/announcement/AnnouncementSearchWindowScreen';
import AnnouncementSearchResultScreen from '../screens/announcement/AnnouncementSearchResultScreen';
import AnnouncementBookmarkBoxScreen from '../screens/announcement/AnnouncementBookmarkBoxScreen';

export type AnnouncementStackParamList = {
  AnnouncementMain: undefined;
  AnnouncementBookmark: undefined;
  AnnouncementDetail: undefined;
  AnnouncementSearchWindow: undefined;
  AnnouncementSearchResult: undefined;
};

const Stack = createStackNavigator<AnnouncementStackParamList>();

const AnnouncementStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AnnouncementDetail"
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
        name="AnnouncementSearchWindow"
        component={AnnoucementSearchContainerScreen}
      />
      <Stack.Screen
        name="AnnouncementSearchResult"
        component={AnnouncementSearchResultScreen}
      />
      <Stack.Screen
        name="AnnouncementBookmark"
        component={AnnouncementBookmarkBoxScreen}
      />
    </Stack.Navigator>
  );
};

export default AnnouncementStackNavigator;
