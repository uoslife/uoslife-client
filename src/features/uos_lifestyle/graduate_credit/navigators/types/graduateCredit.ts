import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ApiResponse} from '../../types';
export type GraduateCreditStackParamList = {
  graduateCredit_main?: undefined;
  graduateCredit_detail: {Props: ApiResponse}; // ApiResponse 타입으로 데이터 받도록 설정
};

// navigation props
export type GraduateCreditNavigationProp =
  NativeStackNavigationProp<GraduateCreditStackParamList>;
