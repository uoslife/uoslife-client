import {createStackNavigator} from '@react-navigation/stack';
import PortalAuthenticationScreen from '../../account/components/screens/portal_account/PortalAuthenticationScreen';
import SetNicknameScreen from '../../account/components/screens/sign_up/SetNicknameScreen';
import {MypageProfileScreen} from '../components/screens';
import PortalAuthenticationManagementScreen from '../components/screens/profile/PortalAuthenticationManagementScreen';
import {MypageAccountStackParamList} from './types/mypage_account';

const AccountStack = createStackNavigator<MypageAccountStackParamList>();

const MypageAccountStackNavigator = () => {
  return (
    <AccountStack.Navigator
      initialRouteName="mypage_account_main"
      screenOptions={{headerShown: false}}>
      <AccountStack.Screen
        name="mypage_account_main"
        component={MypageProfileScreen}
      />
      <AccountStack.Screen
        name="mypage_account_change_nickname"
        component={SetNicknameScreen}
      />
      <AccountStack.Screen
        name="mypage_account_portal_authentication"
        component={PortalAuthenticationScreen}
      />
      <AccountStack.Screen
        name="mypage_account_portal_authentication_management"
        component={PortalAuthenticationManagementScreen}
      />
    </AccountStack.Navigator>
  );
};

export default MypageAccountStackNavigator;
