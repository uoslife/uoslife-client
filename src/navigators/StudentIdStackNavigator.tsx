import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StudentIdMainScreen from '../screens/StudentIdScreen';
import StudentIdPortalAuthenticationScreen from '../screens/account/portalAuthScreenContainer/PortalAuthenticationScreen';

export type StudentIdStackParamList = {
  StudentId_main: undefined;
  StudentId_portalAuthentication: undefined;
};

const Stack = createStackNavigator<StudentIdStackParamList>();

const StudentIdStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="StudentId_main"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="StudentId_main" component={StudentIdMainScreen} />
      <Stack.Screen
        name="StudentId_portalAuthentication"
        component={StudentIdPortalAuthenticationScreen}
      />
    </Stack.Navigator>
  );
};

export default StudentIdStackNavigator;
