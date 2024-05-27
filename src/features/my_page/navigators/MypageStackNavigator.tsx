import {createStackNavigator} from '@react-navigation/stack';
import {MypageAppSettingScreen, MypageMainScreen} from '../components/screens';
import {MypageStackParamList} from './types/mypage';
import MypageAccountStackNavigator from './MypageAccountStackNavigator';
import MypageAppInformationStackNavigator from './MypageAppInformationStackNavigator';

const Stack = createStackNavigator<MypageStackParamList>();

const MypageStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="mypage_main"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="mypage_main" component={MypageMainScreen} />
      <Stack.Screen
        name="mypage_account"
        component={MypageAccountStackNavigator}
      />
      <Stack.Screen
        name="mypage_app_setting"
        component={MypageAppSettingScreen}
      />
      <Stack.Screen
        name="mypage_app_information"
        component={MypageAppInformationStackNavigator}
      />
    </Stack.Navigator>
  );
};

export default MypageStackNavigator;
