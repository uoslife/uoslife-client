import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PoCScreen from '../screens/PoCScreen';
import WebViewScreen from '../screens/WebViewScreen';

export type RootStackParamList = {
  PoC: undefined;
  WebView: {url?: string};
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStackNavigator: React.FC = () => (
  <Stack.Navigator initialRouteName="PoC" screenOptions={{headerShown: false}}>
    <Stack.Screen name="PoC" component={PoCScreen} />
    <Stack.Screen name="WebView" component={WebViewScreen} />
  </Stack.Navigator>
);

export default RootStackNavigator;
