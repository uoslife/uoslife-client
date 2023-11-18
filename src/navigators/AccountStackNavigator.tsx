import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  PrivacyandPoliciesScreen,
  ToSandPoliciesScreen,
} from '../screens/myPage';
import AccountScreen from '../screens/account';

export type AccountStackParamList = {
  Account_main: undefined;
  Account_ToSandPolicies: undefined;
  Account_privacyPolicies: undefined;
};

export type AccountNavigationProp =
  NativeStackNavigationProp<AccountStackParamList>;

const Stack = createStackNavigator<AccountStackParamList>();

const AccountStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Account_main"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Account_main" component={AccountScreen} />
      <Stack.Screen
        name="Account_ToSandPolicies"
        component={ToSandPoliciesScreen}
      />
      <Stack.Screen
        name="Account_privacyPolicies"
        component={PrivacyandPoliciesScreen}
      />
    </Stack.Navigator>
  );
};

export default AccountStackNavigator;
