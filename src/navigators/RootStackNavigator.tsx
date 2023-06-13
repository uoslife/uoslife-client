import React, {useEffect, useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PoCScreen from '../screens/PoCScreen';
import WebViewScreen from '../screens/WebViewScreen';
import {useConfigContext} from '../hooks/ConfigContext';
import SplashScreen from 'react-native-splash-screen';
import BlockScreen from '../screens/BlockScreen';

export type RootStackParamList = {
  PoC: undefined;
  Block: {isError: boolean};
  WebView: {url?: string};
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStackNavigator: React.FC = () => {
  const {config, isLoading, isError} = useConfigContext();
  const isBlocked = useMemo(() => config.get('app.block') !== 'NO', [config]);

  useEffect(() => {
    if (isLoading) return;
    SplashScreen.hide();
  }, [isLoading]);

  if (isLoading) return <></>;

  return (
    <Stack.Navigator
      initialRouteName={isBlocked ? 'Block' : 'PoC'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="PoC" component={PoCScreen} />
      <Stack.Screen
        name="Block"
        component={BlockScreen}
        initialParams={{isError}}
      />
      <Stack.Screen name="WebView" component={WebViewScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
