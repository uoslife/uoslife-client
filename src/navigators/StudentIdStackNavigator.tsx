import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import StudentIdScreen from '../screens/StudentIdScreen';
import StudentIdPortalAuthenticationScreen from '../screens/account/portalAuthScreenContainer/PortalAuthenticationScreen';

export type StudentIdStackParamList = {
  StudentId_main: undefined;
  StudentId_portalAuthentication: {isFromStudentIdScreen: boolean};
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
