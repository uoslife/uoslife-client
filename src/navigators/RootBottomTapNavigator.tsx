import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import {IconsNameType} from '@uoslife/design-system';

import MainScreen from '../screens/MainScreen';
import StudentIdScreen from '../screens/StudentIdScreen';
// import RedirectLibraryRecapScreen from '../screens/thirdTab/RedirectLibraryRecapScreen';
import EventScreen from '../screens/thirdTab/EventScreen';
import BottomTabBar from '../components/molecules/common/bottom_tab_bar/BottomTabBar';

export type RootTabParamList = {
  MainTab: undefined;
  StudentId: undefined;
  ThirdTab: undefined;
};

export type TabScreenItemType = {
  label: string;
  icon: Extract<IconsNameType, 'menu' | 'studentId' | 'leaderboard'>;
  screenName: keyof RootTabParamList;
  component: React.ComponentType<any>;
};

export type RootTabNavigationProps = BottomTabNavigationProp<RootTabParamList>;

const Tab = createBottomTabNavigator<RootTabParamList>();

const tabs: TabScreenItemType[] = [
  {
    component: MainScreen,
    screenName: 'MainTab',
    label: '시대생활',
    icon: 'menu',
  },
  {
    component: StudentIdScreen,
    screenName: 'StudentId',
    label: '학생증',
    icon: 'studentId',
  },
  {
    component: EventScreen,
    screenName: 'ThirdTab',
    label: '이벤트',
    icon: 'leaderboard',
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
