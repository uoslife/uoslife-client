import React from 'react';
import {
  StackNavigationOptions,
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import AnnouncementMainScreen from '../screens/announcement/AnnouncementMainScreen';
import AnnouncementDetailScreen from '../screens/announcement/AnnouncementDetailScreen';
import AnnouncementSearchScreen from '../screens/announcement/AnnouncementSearchScreen';
import AnnouncementBookmarkBoxScreen from '../screens/announcement/AnnouncementBookmarkBoxScreen';
import {ArticleCategoryName} from '../types/announcement.type';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type AnnouncementStackParamList = {
  AnnouncementMain: undefined;
  AnnouncementBookmark: undefined;
  AnnouncementDetail: {id: string; category: ArticleCategoryName};
  AnnouncementSearch: {initialSearchWord: string};
};

export type AnnouncementSearchScreenProps = NativeStackScreenProps<
  AnnouncementStackParamList,
  'AnnouncementSearch'
>;

export type AnnouncementDetailScreenProps = NativeStackScreenProps<
  AnnouncementStackParamList,
  'AnnouncementDetail'
>;

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
