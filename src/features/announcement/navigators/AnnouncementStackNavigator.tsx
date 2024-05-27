import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';

import AnnouncementMainScreen from '../components/screens/AnnouncementMainScreen';
import AnnouncementSearchScreen from '../components/screens/AnnouncementSearchScreen';
import AnnouncementBookmarkBoxScreen from '../components/screens/AnnouncementBookmarkBoxScreen';
import {AnnouncementStackParamList} from './types/announcement';

const Stack = createStackNavigator<AnnouncementStackParamList>();

const AnnouncementStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="announcement_main"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="announcement_main"
        component={AnnouncementMainScreen}
        options={{...SlideTransition}}
      />
      <Stack.Screen
        name="announcement_bookmark"
        component={AnnouncementBookmarkBoxScreen}
        options={{...SlideTransition}}
      />
      <Stack.Screen
        name="announcement_search"
        component={AnnouncementSearchScreen}
        options={{...SlideTransition}}
      />
    </Stack.Navigator>
  );
};

export default AnnouncementStackNavigator;

// 좌우 페이지 이동 구현을 위한 options object: 유튜브 UI를 완전히 따라 구현하기 위해 사용.
// source: https://stackoverflow.com/questions/68731507/react-native-navigation-animation-slide-implementation
const SlideTransition: StackNavigationOptions = {
  cardStyleInterpolator: ({current, next, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            translateX: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -layouts.screen.width],
                })
              : 1,
          },
        ],
      },
    };
  },
};
