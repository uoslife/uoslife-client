import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type MypageAccountStackParamList = {
  mypage_account_main: undefined;
  mypage_account_change_nickname: {isMypage: boolean};
  mypage_account_portal_authentication: undefined;
  mypage_account_portal_authentication_management: undefined;
};
export type MypageAccountNavigationProp =
  NativeStackNavigationProp<MypageAccountStackParamList>;
