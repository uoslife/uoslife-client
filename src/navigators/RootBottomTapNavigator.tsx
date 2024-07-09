import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import BottomTabBar from '../components/molecules/common/bottom_tab_bar/BottomTabBar';
import AnnouncementStackNavigator from '../features/announcement/navigators/AnnouncementStackNavigator';
import MainScreen from '../features/main/components/screens/MainScreen';
import MypageStackNavigator from '../features/my_page/navigators/MypageStackNavigator';
import StudentIdScreen from '../features/student_id/components/screens/StudentIdScreen';
import UosLifestyleScreen from '../features/uos_lifestyle/components/screens/UosLifestyleScreen';
import {RootTabParamList, TabScreenItemType} from './types/rootBottomTap';

const Tab = createBottomTabNavigator<RootTabParamList>();

const tabs: TabScreenItemType[] = [
  {
    component: MainScreen,
    screenName: 'main_tab',
    label: '홈',
    icon: 'tab_home',
  },
  {
    component: AnnouncementStackNavigator,
    screenName: 'announcement_tab',
    label: '공지사항',
    icon: 'tab_announcement',
  },
  {
    component: StudentIdScreen,
    screenName: 'student_id_tab',
    label: '학생증',
    icon: 'tab_student_id',
  },
  {
    component: UosLifestyleScreen,
    screenName: 'uos_lifestyle_tab',
    label: '시대생활',
    icon: 'tab_uos_lifestyle',
  },
  {
    component: MypageStackNavigator,
    screenName: 'mypage_tab',
    label: '마이페이지',
    icon: 'tab_mypage',
  },
];

const RootBottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="main_tab"
      screenOptions={{
        headerShown: false,
      }}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props => <BottomTabBar {...{tabs, ...props}} />}>
      {tabs.map(item => (
        <Tab.Screen
          key={item.screenName}
          name={item.screenName}
          component={item.component}
        />
      ))}
    </Tab.Navigator>
  );
};

export default RootBottomTabNavigation;
