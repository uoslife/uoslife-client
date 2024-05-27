import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {LibraryRoomStatusStackParamList} from './libraryRoomStatus';

export type LibraryStackParamList = {
  library_main?: {status?: 'MY_SEAT' | 'SEAT_LIST' | 'RECORD'};
  library_ranking: undefined;
  library_room_status?: LibraryRoomStatusStackParamList;
  library_challenge: undefined;
  library_portal_authentication: undefined;
};

// navigation props
export type LibraryNavigationProp =
  NativeStackNavigationProp<LibraryStackParamList>;
export type LibraryRoomStatusNavigationProp =
  NativeStackNavigationProp<LibraryRoomStatusStackParamList>;

// screen props
export type LibraryMainScreenProps = NativeStackScreenProps<
  LibraryStackParamList,
  'library_main'
>;
