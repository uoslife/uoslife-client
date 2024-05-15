import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  MypageAppInformationScreen,
  MypageAppSettingScreen,
  MypageMainScreen,
  MypageProfileScreen,
  ToSandPoliciesScreen,
  AdvertisingandMarketingConsentScreen,
  PrivacyandPoliciesScreen,
} from '../screens/mypage';
import SetNicknameScreen from '../screens/account/sign_up/SetNicknameScreen';
import PortalAuthenticationScreen from '../screens/account/portal_account/PortalAuthenticationScreen';
import PortalAuthenticationManagementScreen from '../screens/mypage/profile/PortalAuthenticationManagementScreen';

export type MypageStackParamList = {
  Mypage_main: undefined;
  Mypage_profile: MypageProfileStackParamList;
  Mypage_appSetting: undefined;
  Mypage_appInformation: MypageAppInformationStackParamList;
};

export type MypageProfileStackParamList = {
  Mypage_profile_Main: undefined;
  Mypage_changeNickname: {isMypage: boolean};
  Mypage_portalAuthentication: undefined;
  Mypage_portalAuthenticationManagement: undefined;
};
export type MypageProfileNavigationProp =
  NativeStackNavigationProp<MypageProfileStackParamList>;

export type MypageAppInformationStackParamList = {
  Mypage_appInformation_Main: undefined;
  Mypage_ToSandPolicies: undefined;
  Mypage_privacyPolicies: undefined;
  Mypage_advertisingandMarketing: undefined;
};
export type MypageAppInformationNavigationProp =
  NativeStackNavigationProp<MypageAppInformationStackParamList>;

const Stack = createStackNavigator<MypageStackParamList>();
const ProfileStack = createStackNavigator<MypageProfileStackParamList>();
const AppInformationStack =
  createStackNavigator<MypageAppInformationStackParamList>();

const MypageProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="Mypage_profile_Main"
      screenOptions={{headerShown: false}}>
      <ProfileStack.Screen
        name="Mypage_profile_Main"
        component={MypageProfileScreen}
      />
      <ProfileStack.Screen
        name="Mypage_changeNickname"
        component={SetNicknameScreen}
      />
      <ProfileStack.Screen
        name="Mypage_portalAuthentication"
        component={PortalAuthenticationScreen}
      />
      <ProfileStack.Screen
        name="Mypage_portalAuthenticationManagement"
        component={PortalAuthenticationManagementScreen}
      />
    </ProfileStack.Navigator>
  );
};

const MypageAppInformationStackNavigator = () => {
  return (
    <AppInformationStack.Navigator
      initialRouteName="Mypage_appInformation_Main"
      screenOptions={{headerShown: false}}>
      <AppInformationStack.Screen
        name="Mypage_appInformation_Main"
        component={MypageAppInformationScreen}
      />
      <AppInformationStack.Screen
        name="Mypage_ToSandPolicies"
        component={ToSandPoliciesScreen}
      />
      <AppInformationStack.Screen
        name="Mypage_privacyPolicies"
        component={PrivacyandPoliciesScreen}
      />
      <AppInformationStack.Screen
        name="Mypage_advertisingandMarketing"
        component={AdvertisingandMarketingConsentScreen}
      />
    </AppInformationStack.Navigator>
  );
};

const MypageStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Mypage_main"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Mypage_main" component={MypageMainScreen} />
      <Stack.Screen name="Mypage_profile" component={MypageProfileNavigator} />
      <Stack.Screen
        name="Mypage_appSetting"
        component={MypageAppSettingScreen}
      />
      <Stack.Screen
        name="Mypage_appInformation"
        component={MypageAppInformationStackNavigator}
      />
    </Stack.Navigator>
  );
};

export default MypageStackNavigator;
