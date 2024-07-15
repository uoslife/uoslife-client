import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams} from '@react-navigation/native';
import {IconsNameType} from '@uoslife/design-system';
import {MypageStackParamList} from '../../features/my_page/navigators/types/mypage';
import {AnnouncementStackParamList} from '../../features/announcement/navigators/types/announcement';

export type RootTabParamList = {
  main_tab: undefined;
  announcement_tab: NavigatorScreenParams<AnnouncementStackParamList>;
  student_id_tab: undefined;
  uos_lifestyle_tab: undefined;
  mypage_tab: NavigatorScreenParams<MypageStackParamList>;
};

export type RootTabNavigationProps = BottomTabNavigationProp<RootTabParamList>;

export type TabScreenItemType = {
  label: string;
  icon: Extract<
    IconsNameType,
    | 'tab_home'
    | 'tab_announcement'
    | 'tab_mypage'
    | 'tab_student_id'
    | 'tab_uos_lifestyle'
  >;
  screenName: keyof RootTabParamList;
  component: React.ComponentType<any>;
};
