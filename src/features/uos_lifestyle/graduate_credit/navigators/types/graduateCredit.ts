import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ApiResponse} from '../../types';
export type GraduateCreditStackParamList = {
  graduate_credit_main: undefined; // ApiResponse 타입으로 데이터 받도록 설정
  graduate_credit_detail: {Props: ApiResponse; type: string}; // ApiResponse 타입으로 데이터 받도록 설정
};

// navigation props
export type GraduateCreditNavigationProp =
  NativeStackNavigationProp<GraduateCreditStackParamList>;
