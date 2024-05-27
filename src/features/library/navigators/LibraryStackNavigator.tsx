import {createStackNavigator} from '@react-navigation/stack';

import LibraryMainScreen from '../components/screens/LibraryMainScreen';
import LibraryChallengeScreen from '../components/screens/LibraryChallengeScreen';
import LibraryRankingScreen from '../components/screens/LibraryRankingScreen';

import {LibraryStackParamList} from './types/library';
import PortalAuthenticationScreen from '../../account/components/screens/portal_account/PortalAuthenticationScreen';
import LibraryRoomStatusStackNavigator from './LibraryRoomStatusStackNavigator';

const Stack = createStackNavigator<LibraryStackParamList>();

const LibraryStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="library_main"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="library_main" component={LibraryMainScreen} />
      <Stack.Screen
        name="library_room_status"
        component={LibraryRoomStatusStackNavigator}
      />
      <Stack.Screen name="library_ranking" component={LibraryRankingScreen} />
      <Stack.Screen
        name="library_challenge"
        component={LibraryChallengeScreen}
      />
      <Stack.Screen
        name="library_portal_authentication"
        component={PortalAuthenticationScreen}
      />
    </Stack.Navigator>
  );
};

export default LibraryStackNavigator;
