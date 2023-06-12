import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PoCScreen from '../screens/PoCScreen';

export type RootStackParamList = {
  PoC: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStackNavigator: React.FC = () => (
  <Stack.Navigator initialRouteName="PoC" screenOptions={{headerShown: false}}>
    <Stack.Screen name="PoC" component={PoCScreen} />
  </Stack.Navigator>
);

export default RootStackNavigator;
