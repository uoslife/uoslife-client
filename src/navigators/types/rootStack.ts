import {NavigatorScreenParams} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootTabParamList} from './rootBottomTap';
import {LibraryStackParamList} from '../../features/library/navigators/types/library';
import {AnnouncementOriginNameType} from '../../features/announcement/constants/announcement';

export type RootStackParamList = {
  // root tab
  root: NavigatorScreenParams<RootTabParamList>;

  // main
  library: NavigatorScreenParams<LibraryStackParamList>;
  cafeteria: undefined;
  roulette: undefined;

  // announcement
  announcement_detail: {id: number; origin: AnnouncementOriginNameType};

  // student_id
  student_id_portal_authentication: undefined;

  // uos_lifestyle
  library_recap: undefined;
  meeting: undefined;
  check_grade: undefined;
  restaurant: undefined;

  // account
  account: undefined;
  account_tos: undefined;
  account_privacy_policies: undefined;
};

export type RootNavigationProps = StackNavigationProp<RootStackParamList>;

export type AnnouncementDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'announcement_detail'
>;
