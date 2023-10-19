import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StudentIdScreen from '../screens/StudentIdScreen';
import StudentIdPortalAuthenticationScreen from '../screens/account/portalAuthScreenContainer/PortalAuthenticationScreen';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type StudentIdStackParamList = {
  StudentId_main: undefined;
  StudentId_portalAuthentication: undefined;
};

export type StudentIdNavigationProp =
  NativeStackNavigationProp<StudentIdStackParamList>;

const Stack = createStackNavigator<StudentIdStackParamList>();

const StudentIdStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="StudentId_main"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="StudentId_main" component={StudentIdScreen} />
      <Stack.Screen
        name="StudentId_portalAuthentication"
        component={StudentIdPortalAuthenticationScreen}
      />
    </Stack.Navigator>
  );
};

export default StudentIdStackNavigator;
