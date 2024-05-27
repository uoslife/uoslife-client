import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type LibraryRoomStatusStackParamList = {
  library_room_status_main?: {roomType?: 'ECONOMY' | 'LAW' | 'CENTRAL'};
  library_room_status_seating_chart: {roomNumber: string};
};

// navigation props
export type LibraryRoomStatusScreenProps = NativeStackScreenProps<
  LibraryRoomStatusStackParamList,
  'library_room_status_main'
>;

// screen props
export type LibrarySeatListScreenProps = NativeStackScreenProps<
  LibraryRoomStatusStackParamList,
  'library_room_status_seating_chart'
>;
