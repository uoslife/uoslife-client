import {createStackNavigator} from '@react-navigation/stack';
import {
  MypageAppInformationScreen,
  ToSandPoliciesScreen,
  PrivacyandPoliciesScreen,
  AdvertisingandMarketingConsentScreen,
} from '../components/screens';
import {MypageAppInformationStackParamList} from './types/mypage_app_information';

const AppInformationStack =
  createStackNavigator<MypageAppInformationStackParamList>();

const MypageAppInformationStackNavigator = () => {
  return (
    <AppInformationStack.Navigator
      initialRouteName="mypage_app_information_main"
      screenOptions={{headerShown: false}}>
      <AppInformationStack.Screen
        name="mypage_app_information_main"
        component={MypageAppInformationScreen}
      />
      <AppInformationStack.Screen
        name="mypage_app_information_tos"
        component={ToSandPoliciesScreen}
      />
      <AppInformationStack.Screen
        name="mypage_app_information_privacy_policies"
        component={PrivacyandPoliciesScreen}
      />
      <AppInformationStack.Screen
        name="mypage_app_information_advertising_and_marketing"
        component={AdvertisingandMarketingConsentScreen}
      />
    </AppInformationStack.Navigator>
  );
};

export default MypageAppInformationStackNavigator;
