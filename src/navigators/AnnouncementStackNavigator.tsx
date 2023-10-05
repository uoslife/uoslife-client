import React from 'react';
import {
  StackNavigationOptions,
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import AnnouncementMainScreen, {
  ArticleCategoryName,
} from '../screens/announcement/AnnouncementMainScreen';
import AnnouncementDetailScreen from '../screens/announcement/AnnouncementDetailScreen';
import AnnouncementSearchScreen from '../screens/announcement/AnnouncementSearchScreen';
import AnnouncementBookmarkBoxScreen from '../screens/announcement/AnnouncementBookmarkBoxScreen';

export type AnnouncementStackParamList = {
  AnnouncementMain: undefined;
  AnnouncementBookmark: undefined;
  AnnouncementDetail: {id: string; category: ArticleCategoryName};
  AnnouncementSearch: {initialSearchWord: string};
};

export type AnnouncementNavigationProps =
  StackNavigationProp<AnnouncementStackParamList>;

const Stack = createStackNavigator<AnnouncementStackParamList>();

// 좌우 페이지 이동 구현을 위한 options object: 유튜브 UI를 완전히 따라 구현하기 위해 사용, 일단은 존치.
// source: https://stackoverflow.com/questions/68731507/react-native-navigation-animation-slide-implementation
const SlideTransition: StackNavigationOptions = {
  cardStyleInterpolator: ({current, next, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            translateX: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -layouts.screen.width],
                })
              : 1,
          },
        ],
      },
    };
  },
};

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
