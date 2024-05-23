import {useState} from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {NavigatorScreenParams} from '@react-navigation/native';
import {useAtom} from 'jotai';
import MaintenanceScreen from '../screens/etc/MaintenanceScreen';
import CafeteriaScreen from '../screens/cafeteria/CafeteriaScreen';

import RootBottomTapNavigator, {
  RootTabParamList,
} from './RootBottomTapNavigator';

import {
  PrivacyandPoliciesScreen,
  ToSandPoliciesScreen,
} from '../screens/mypage';
import PortalAuthenticationScreen from '../screens/account/portal_account/PortalAuthenticationScreen';
import AccountScreenContainer from '../screens/account';
import useInitApp from '../hooks/useInitApp';
import LibraryRecapScreen from '../screens/uoslife_life/LibraryRecapScreen';
import LibraryStackNavigator from './LibraryStackNavigator';
import {LibraryStackParamList} from './types/library';
import MeetingScreen from '../screens/uoslife_life/MeetingScreen';
import CheckGradeScreen from '../screens/uoslife_life/CheckGradeScreen';
import RouletteScreen from '../screens/etc/RouletteScreen';
import supabaseConfigAtom from '../store/app/supabaseConfig';
import useAppStateForeground from '../hooks/useAppStateForeground';
import useIsLoggedInListner from '../hooks/useIsLoggedInListner';
import {useOpenDeeplink} from '../hooks/useOpenDeeplink';

export type RootStackParamList = {
  Main: NavigatorScreenParams<RootTabParamList>;
  Library: NavigatorScreenParams<LibraryStackParamList>;
  Cafeteria: undefined;
  StudentId_PortalAuthentication: undefined;
  LibraryRecap: undefined;
  UoslifeMeeting: undefined;
  CheckGrade: undefined;
  Roulette: undefined;

  Account: undefined;
  Account_ToSandPolicies: undefined;
  Account_privacyPolicies: undefined;
};

export type RootNavigationProps = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

const RootStackNavigator: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [{data: configData, isFetching, refetch}] = useAtom(supabaseConfigAtom);

  useInitApp({configData, isFetching});
  useIsLoggedInListner(setIsLoggedIn);
  useOpenDeeplink(isLoggedIn);
  useAppStateForeground(() => refetch()); // supabase config를 불러오기 위해 사용 ex. 점검 상태

  if (configData?.isMaintenance) {
    return <MaintenanceScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Main"
            component={RootBottomTapNavigator}
            options={{animationEnabled: false}}
          />
          <Stack.Screen name="Library" component={LibraryStackNavigator} />
          <Stack.Screen name="Cafeteria" component={CafeteriaScreen} />
          <Stack.Screen
            name="StudentId_PortalAuthentication"
            component={PortalAuthenticationScreen}
          />
          <Stack.Screen name="LibraryRecap" component={LibraryRecapScreen} />
          <Stack.Screen name="UoslifeMeeting" component={MeetingScreen} />
          <Stack.Screen name="CheckGrade" component={CheckGradeScreen} />
          <Stack.Screen name="Roulette" component={RouletteScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Account" component={AccountScreenContainer} />
          <Stack.Screen
            name="Account_ToSandPolicies"
            component={ToSandPoliciesScreen}
          />
          <Stack.Screen
            name="Account_privacyPolicies"
            component={PrivacyandPoliciesScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
