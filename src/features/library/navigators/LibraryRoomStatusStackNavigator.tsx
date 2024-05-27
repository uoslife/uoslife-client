import {createStackNavigator} from '@react-navigation/stack';
import LibraryRoomStatusScreen from '../components/screens/room_status/LibraryRoomStatusScreen';
import LibrarySeatingChartScreen from '../components/screens/room_status/LibrarySeatingChartScreen';
import {LibraryRoomStatusStackParamList} from './types/libraryRoomStatus';

const LibraryRoomStatusStack =
  createStackNavigator<LibraryRoomStatusStackParamList>();

const LibraryRoomStatusStackNavigator = () => {
  return (
    <LibraryRoomStatusStack.Navigator
      initialRouteName="library_room_status_main"
      screenOptions={{headerShown: false}}>
      <LibraryRoomStatusStack.Screen
        name="library_room_status_main"
        component={LibraryRoomStatusScreen}
      />
      <LibraryRoomStatusStack.Screen
        name="library_room_status_seating_chart"
        component={LibrarySeatingChartScreen}
      />
    </LibraryRoomStatusStack.Navigator>
  );
};

export default LibraryRoomStatusStackNavigator;
