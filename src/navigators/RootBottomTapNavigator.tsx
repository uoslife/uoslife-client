import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import {IconsNameType} from '@uoslife/design-system';

import {NavigatorScreenParams} from '@react-navigation/native';
import MainScreen from '../screens/MainScreen';
import StudentIdScreen from '../screens/StudentIdScreen';
import BottomTabBar from '../components/molecules/common/bottom_tab_bar/BottomTabBar';
import UoslifeLifeScreen from '../screens/uoslife_life/UoslifeLifeScreen';
import MypageStackNavigator, {
  MypageStackParamList,
} from './MypageStackNavigator';
import AnnouncementStackNavigator, {
  AnnouncementStackParamList,
} from './AnnouncementStackNavigator';

export type RootTabParamList = {
  MainTab: undefined;
  AnnouncementTab: NavigatorScreenParams<AnnouncementStackParamList>;
  StudentIdTab: undefined;
  uoslifeLifeTab: undefined;
  MypageTab: NavigatorScreenParams<MypageStackParamList>;
};

export type TabScreenItemType = {
  label: string;
  icon: Extract<
    IconsNameType,
    | 'tab_home'
    | 'tab_announcement'
    | 'tab_mypage'
    | 'tab_student_id'
    | 'tab_uoslife_life'
  >;
  screenName: keyof RootTabParamList;
  component: React.ComponentType<any>;
};

export type RootTabNavigationProps = BottomTabNavigationProp<RootTabParamList>;

const Tab = createBottomTabNavigator<RootTabParamList>();

const tabs: TabScreenItemType[] = [
  {
    component: MainScreen,
    screenName: 'MainTab',
    label: '홈',
    icon: 'tab_home',
  },
  {
    component: AnnouncementStackNavigator,
    screenName: 'AnnouncementTab',
    label: '공지사항',
    icon: 'tab_announcement',
  },
  {
    component: StudentIdScreen,
    screenName: 'StudentIdTab',
    label: '학생증',
    icon: 'tab_student_id',
  },
  {
    component: UoslifeLifeScreen,
    screenName: 'uoslifeLifeTab',
    label: '시대생활',
    icon: 'tab_uoslife_life',
  },
  {
    component: MypageStackNavigator,
    screenName: 'MypageTab',
    label: '마이페이지',
    icon: 'tab_home',
  },
];

const RootBottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="MainTab"
      screenOptions={{
        headerShown: false,
      }}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props => <BottomTabBar {...{tabs, ...props}} />}>
      {tabs.map(item => (
        <Tab.Screen
          key={item.screenName}
          name={item.screenName}
          component={item.component}
        />
      ))}
    </Tab.Navigator>
  );
};

export default RootBottomTabNavigation;
