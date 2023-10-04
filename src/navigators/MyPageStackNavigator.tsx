import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  MypageAppInformationScreen,
  MypageAppSettingScreen,
  MypageMainScreen,
  MypageProfileScreen,
} from '../screens/myPage';
import PortalAuthenticationScreen from '../screens/account/portalAuthScreenContainer/PortalAuthenticationScreen';
import SetNicknameScreen from '../screens/account/common/SetNicknameScreen';
import VerificationScreen from '../screens/account/common/VerificationScreen';
import ToSandPoliciesScreen from '../screens/myPage/appInformationScreens/ToSandPolicies';
import PrivacyPoliciesScreen from '../screens/myPage/appInformationScreens/PrivacyandPolicies';
import AdvertisingandMarketingConsentScreen from '../screens/myPage/appInformationScreens/AdvertisingandMarketingConsentScreen';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type MyPageStackParamList = {
  Mypage_main: undefined;
  Mypage_profile: undefined;
  Mypage_appSetting: undefined;
  Mypage_appInformation: undefined;
};

export type MyPageAccountStackParamList = {
  Mypage_profileMain: undefined;
  Mypage_changeNickname: {isMyPage: boolean};
  Mypage_portalAuthentication: undefined;
  Mypage_changeNumber: undefined;
};

export type MyPageAppInformationStackParamList = {
  Mypage_appInformation: undefined;
  Mypage_ToSandPoliciesWebView: {url?: string};
  Mypage_privacyPoliciesWebView: {url?: string};
  Mypage_advertisingandMarketingConsentWebView: {url?: string};
  Mypage_dvertisingandMarketing: undefined;
};

export type MypageAppInformationScreenRouteProp = NativeStackNavigationProp<
  MyPageAppInformationStackParamList,
  'Mypage_appInformation'
>;

const Stack = createStackNavigator<MyPageStackParamList>();
const AccountStack = createStackNavigator<MyPageAccountStackParamList>();
const AppInformationStack =
  createStackNavigator<MyPageAppInformationStackParamList>();

const MypageAccountNavigator = () => {
  return (
    <AccountStack.Navigator
      initialRouteName="Mypage_profileMain"
      screenOptions={{headerShown: false}}>
      <AccountStack.Screen
        name="Mypage_profileMain"
        component={MypageProfileScreen}
      />
      <AccountStack.Screen
        name="Mypage_changeNickname"
        component={SetNicknameScreen}
      />
      <AccountStack.Screen
        name="Mypage_portalAuthentication"
        component={PortalAuthenticationScreen}
      />
      <AccountStack.Screen
        name="Mypage_changeNumber"
        component={VerificationScreen}
      />
    </AccountStack.Navigator>
  );
};

const MyPageAppInformationStackNavigator = () => {
  return (
    <AppInformationStack.Navigator
      initialRouteName="Mypage_appInformation"
      screenOptions={{headerShown: false}}>
      <AppInformationStack.Screen
        name="Mypage_appInformation"
        component={MypageAppInformationScreen}
      />
      <AppInformationStack.Screen
        name="Mypage_ToSandPoliciesWebView"
        component={ToSandPoliciesScreen}
      />
      <AppInformationStack.Screen
        name="Mypage_privacyPoliciesWebView"
        component={PrivacyPoliciesScreen}
      />
      <AppInformationStack.Screen
        name="Mypage_advertisingandMarketingConsentWebView"
        component={AdvertisingandMarketingConsentScreen}
      />
    </AppInformationStack.Navigator>
  );
};

const MyPageStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Mypage_main"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Mypage_main" component={MypageMainScreen} />
      <Stack.Screen name="Mypage_profile" component={MypageAccountNavigator} />
      <Stack.Screen
        name="Mypage_appSetting"
        component={MypageAppSettingScreen}
      />
      <Stack.Screen
        name="Mypage_appInformation"
        component={MyPageAppInformationStackNavigator}
      />
    </Stack.Navigator>
  );
};

export default MyPageStackNavigator;
