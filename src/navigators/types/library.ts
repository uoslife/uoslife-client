import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type LibraryStackParamList = {
  Library_main?: {status?: 'MY_SEAT' | 'SEAT_LIST' | 'RECORD'};
  Library_ranking: undefined;
  Library_room_status?: LibraryRoomStatusStackParamList;
  Library_challenge: undefined;
  Library_portal_authentication: undefined;
};

export type LibraryRoomStatusStackParamList = {
  Library_room_status_main?: {roomType?: 'ECONOMY' | 'LAW' | 'CENTRAL'};
  Library_seating_chart: {roomNumber: string};
};

// navigation props
export type LibraryNavigationProp =
  NativeStackNavigationProp<LibraryStackParamList>;
export type LibraryRoomStatusNavigationProp =
  NativeStackNavigationProp<LibraryRoomStatusStackParamList>;

// screen props
export type LibraryMainScreenProps = NativeStackScreenProps<
  LibraryStackParamList,
  'Library_main'
>;
export type LibraryRoomStatusScreenProps = NativeStackScreenProps<
  LibraryRoomStatusStackParamList,
  'Library_room_status_main'
>;
export type LibrarySeatListScreenProps = NativeStackScreenProps<
  LibraryRoomStatusStackParamList,
  'Library_seating_chart'
>;
