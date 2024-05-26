import {useState} from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {NavigatorScreenParams} from '@react-navigation/native';
import {useAtom} from 'jotai';
import MaintenanceScreen from '../screens/MaintenanceScreen';

import RootBottomTapNavigator, {
  RootTabParamList,
} from './RootBottomTapNavigator';

import {
  PrivacyandPoliciesScreen,
  ToSandPoliciesScreen,
} from '../features/my_page/components/screens';

import useInitApp from '../hooks/useInitApp';
import LibraryRecapScreen from '../features/uos_lifestyle/library_recap/LibraryRecapScreen';
import LibraryStackNavigator from './LibraryStackNavigator';
import {LibraryStackParamList} from './types/library';
import MeetingScreen from '../features/uos_lifestyle/meeting/MeetingScreen';
import RouletteScreen from '../screens/RouletteScreen';
import supabaseConfigAtom from '../store/app/supabaseConfig';
import useAppStateForeground from '../hooks/useAppStateForeground';
import useIsLoggedInListner from '../hooks/useIsLoggedInListner';
import {useOpenDeeplink} from '../hooks/useOpenDeeplink';
import CafeteriaScreen from '../features/cafeteria/components/screens/CafeteriaScreen';
import AccountScreenContainer from '../features/account/components/screens';
import PortalAuthenticationScreen from '../features/account/components/screens/portal_account/PortalAuthenticationScreen';
import CheckGradeScreen from '../features/uos_lifestyle/check_grade/CheckGradeScreen';

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
