import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  MypageAppInformationScreen,
  MypageAppSettingScreen,
  MypageMainScreen,
  MypageProfileScreen,
} from '../screens/mypage';
import PortalAuthenticationScreen from '../screens/account/portalAuthScreenContainer/PortalAuthenticationScreen';
import SetNicknameScreen from '../screens/account/common/SetNicknameScreen';
import VerificationScreen from '../screens/account/common/VerificationScreen';

export type MyPageStackParamList = {
  Mypage_main: undefined;
  Mypage_profile: undefined;
  Mypage_appSetting: undefined;
  Mypage_appInformation: undefined;
  Mypage_inquiry: undefined;
};

export type MyPageNestedStackParamList = {
  Mypage_nestedMain: undefined;
  Mypage_changeNickname: undefined;
  Mypage_portalAuthentication: undefined;
  Mypage_changeNumber: undefined;
};

const Stack = createStackNavigator<MyPageStackParamList>();
const NestedStack = createStackNavigator<MyPageNestedStackParamList>();

const MypageNestedNavigator = () => {
  return (
    <NestedStack.Navigator
      initialRouteName="Mypage_nestedMain"
      screenOptions={{headerShown: false}}>
      <NestedStack.Screen
        name="Mypage_nestedMain"
        component={MypageProfileScreen}
      />
      <NestedStack.Screen
        name="Mypage_changeNickname"
        component={SetNicknameScreen}
      />
      <NestedStack.Screen
        name="Mypage_portalAuthentication"
        component={PortalAuthenticationScreen}
      />
      <NestedStack.Screen
        name="Mypage_changeNumber"
        component={VerificationScreen}
      />
    </NestedStack.Navigator>
  );
};

const MyPageStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Mypage_main"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Mypage_main" component={MypageMainScreen} />
      <Stack.Screen name="Mypage_profile" component={MypageNestedNavigator} />
      <Stack.Screen
        name="Mypage_appSetting"
        component={MypageAppSettingScreen}
      />
      <Stack.Screen
        name="Mypage_appInformation"
        component={MypageAppInformationScreen}
      />
      <Stack.Screen
        name="Mypage_inquiry"
        component={MypageAppInformationScreen}
      />
    </Stack.Navigator>
  );
};

export default MyPageStackNavigator;
