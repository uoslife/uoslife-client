import {createStackNavigator} from '@react-navigation/stack';

import LibraryMainScreen from '../screens/library/LibraryMainScreen';
import LibraryChallengeScreen from '../screens/library/LibraryChallengeScreen';
import LibraryRankingScreen from '../screens/library/LibraryRankingScreen';
import LibraryRoomStatusScreen from '../screens/library/room_status/LibraryRoomStatusScreen';
import LibraryRoomListScreen from '../screens/library/room_status/LibrarySeatListScreen';
import PortalAuthenticationScreen from '../screens/account/common/PortalAuthenticationScreen';

import {
  LibraryRoomStatusStackParamList,
  LibraryStackParamList,
} from './types/library';

const Stack = createStackNavigator<LibraryStackParamList>();
const LibraryRoomStatusStack =
  createStackNavigator<LibraryRoomStatusStackParamList>();

const LibraryRoomStatusNavigator = () => {
  return (
    <LibraryRoomStatusStack.Navigator
      initialRouteName="Library_room_status_main"
      screenOptions={{headerShown: false}}>
      <LibraryRoomStatusStack.Screen
        name="Library_room_status_main"
        component={LibraryRoomStatusScreen}
      />
      <LibraryRoomStatusStack.Screen
        name="Library_seat_list"
        component={LibraryRoomListScreen}
      />
      <LibraryRoomStatusStack.Screen
        name="Library_portal_authentication"
        component={PortalAuthenticationScreen}
      />
    </LibraryRoomStatusStack.Navigator>
  );
};

const LibraryStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Library_main"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Library_main" component={LibraryMainScreen} />
      <Stack.Screen
        name="Library_room_status"
        component={LibraryRoomStatusNavigator}
      />
      <Stack.Screen name="Library_ranking" component={LibraryRankingScreen} />
      <Stack.Screen
        name="Library_challenge"
        component={LibraryChallengeScreen}
      />
    </Stack.Navigator>
  );
};

export default LibraryStackNavigator;