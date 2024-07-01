import {createStackNavigator} from '@react-navigation/stack';
import {useAtom} from 'jotai';
import {useState} from 'react';
import MaintenanceScreen from '../screens/MaintenanceScreen';

import RootBottomTapNavigator from './RootBottomTapNavigator';

import {
  PrivacyandPoliciesScreen,
  ToSandPoliciesScreen,
} from '../features/my_page/components/screens';

import AccountScreenContainer from '../features/account/components/screens';
import PortalAuthenticationScreen from '../features/account/components/screens/portal_account/PortalAuthenticationScreen';
import AnnouncementDetailScreen from '../features/announcement/components/screens/AnnouncementDetailScreen';
import CafeteriaScreen from '../features/cafeteria/components/screens/CafeteriaScreen';
import LibraryStackNavigator from '../features/library/navigators/LibraryStackNavigator';
import CheckGradeScreen from '../features/uos_lifestyle/check_grade/CheckGradeScreen';
import LibraryRecapScreen from '../features/uos_lifestyle/library_recap/LibraryRecapScreen';
import MeetingScreen from '../features/uos_lifestyle/meeting/MeetingScreen';
import useAppStateForeground from '../hooks/useAppStateForeground';
import useInitApp from '../hooks/useInitApp';
import useIsLoggedInListner from '../hooks/useIsLoggedInListner';
import {useOpenDeeplink} from '../hooks/useOpenDeeplink';
import RouletteScreen from '../screens/RouletteScreen';
import supabaseConfigAtom from '../store/app/supabaseConfig';
import {RootStackParamList} from './types/rootStack';
import AcademicCalendarStackNavigator from '../features/uos_lifestyle/academic_calendar/navigators/AcademicCalendarStackNavigator';

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

  // https://reactnavigation.org/docs/hiding-tabbar-in-screens
  return (
    <Stack.Navigator
      initialRouteName="root"
      screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <Stack.Group>
          <Stack.Screen
            name="root"
            component={RootBottomTapNavigator}
            options={{animationEnabled: false}}
          />
          {/* main */}
          <Stack.Screen name="library" component={LibraryStackNavigator} />
          <Stack.Screen name="cafeteria" component={CafeteriaScreen} />
          <Stack.Screen name="roulette" component={RouletteScreen} />
          {/* announcement */}
          <Stack.Screen
            name="announcement_detail"
            component={AnnouncementDetailScreen}
          />
          {/* student_id */}
          <Stack.Screen
            name="student_id_portal_authentication"
            component={PortalAuthenticationScreen}
          />
          {/* uos_lifestyle */}
          <Stack.Screen name="library_recap" component={LibraryRecapScreen} />
          <Stack.Screen name="meeting" component={MeetingScreen} />
          <Stack.Screen name="check_grade" component={CheckGradeScreen} />
          <Stack.Screen
            name="academic_calendar"
            component={AcademicCalendarStackNavigator}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="account" component={AccountScreenContainer} />
          <Stack.Screen name="account_tos" component={ToSandPoliciesScreen} />
          <Stack.Screen
            name="account_privacy_policies"
            component={PrivacyandPoliciesScreen}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
