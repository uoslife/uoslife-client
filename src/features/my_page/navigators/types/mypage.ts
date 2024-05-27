import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MypageAppInformationStackParamList} from './mypage_app_information';
import {MypageAccountStackParamList} from './mypage_account';

export type MypageStackParamList = {
  mypage_main: undefined;
  mypage_account: NavigatorScreenParams<MypageAccountStackParamList>;
  mypage_app_setting: undefined;
  mypage_app_information: NavigatorScreenParams<MypageAppInformationStackParamList>;
};

export type MypageNavigationProp =
  NativeStackNavigationProp<MypageStackParamList>;
