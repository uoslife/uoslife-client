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
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type AnnouncementStackParamList = {
  AnnouncementMain: undefined;
  AnnouncementBookmark: undefined;
  AnnouncementDetail: {id: number};
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
        options={{...SlideTransition}}
      />
      <Stack.Screen
        name="AnnouncementDetail"
        component={AnnouncementDetailScreen}
        options={{...SlideTransition}}
      />
      <Stack.Screen
        name="AnnouncementBookmark"
        component={AnnouncementBookmarkBoxScreen}
        options={{...SlideTransition}}
      />
      <Stack.Screen
        name="AnnouncementSearch"
        component={AnnouncementSearchScreen}
        options={{...SlideTransition}}
      />
    </Stack.Navigator>
  );
};

export default AnnouncementStackNavigator;

// 좌우 페이지 이동 구현을 위한 options object: 유튜브 UI를 완전히 따라 구현하기 위해 사용.
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
