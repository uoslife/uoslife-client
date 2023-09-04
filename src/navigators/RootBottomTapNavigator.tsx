import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/MainScreen';
import StudentIdScreen from '../screens/StudentIdScreen';
import {Icon, Txt} from '@uoslife/design-system';
import {Platform, StyleSheet} from 'react-native';

export type RootTabParamList = {
  Main: undefined;
  StudentId: undefined;
  SetNickname: undefined;
};

export type RootTabNavigationProps = BottomTabNavigationProp<RootTabParamList>;

const Tab = createBottomTabNavigator<RootTabParamList>();

type bottomTabNavigateDataType = {
  label: string;
  icon: 'menu' | 'studentId';
  screenName: keyof RootTabParamList;
  component: React.ComponentType<any>;
};

const BOTTOM_TAB_NAVIGATE_DATA: bottomTabNavigateDataType[] = [
  {
    label: '시대생활',
    icon: 'menu',
    screenName: 'Main',
    component: MainScreen,
  },
  {
    label: '학생증',
    icon: 'studentId',
    screenName: 'StudentId',
    component: StudentIdScreen,
  },
  {
    label: '시대팅',
    icon: 'menu',
    screenName: 'SetNickname',
    component: StudentIdScreen,
  },
];

const RootBottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {...Style.bottomTapLayout, ...Style.bottomTapShadow},
      }}>
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              color={focused ? 'primaryBrand' : 'grey90'}
              name={'menu'}
              width={24}
              height={24}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Txt
              label={'시대생활'}
              color={focused ? 'primaryBrand' : 'grey90'}
              typograph={'labelMedium'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="StudentId"
        component={StudentIdScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              color={focused ? 'primaryBrand' : 'grey90'}
              name={'studentId'}
              width={24}
              height={24}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Txt
              label={'학생증'}
              color={focused ? 'primaryBrand' : 'grey90'}
              typograph={'labelMedium'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SetNickname"
        component={StudentIdScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              color={focused ? 'primaryBrand' : 'grey90'}
              name={'studentId'}
              width={24}
              height={24}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Txt
              label={'채팅'}
              color={focused ? 'primaryBrand' : 'grey90'}
              typograph={'labelMedium'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Style = StyleSheet.create({
  bottomTapLayout: {
    position: 'absolute',
    height: 60,
    borderRadius: 60,
    paddingTop: 8,
    paddingBottom: 8,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 40,
  },
  bottomTapShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

export default RootBottomTabNavigation;
