import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackNavigationProp} from '@react-navigation/stack';

export type AnnouncementStackParamList = {
  announcement_main: undefined;
  announcement_bookmark: undefined;
  announcement_search: {initialSearchWord: string};
};

export type AnnouncementSearchScreenProps = NativeStackScreenProps<
  AnnouncementStackParamList,
  'announcement_search'
>;

export type AnnouncementNavigationProps =
  StackNavigationProp<AnnouncementStackParamList>;
