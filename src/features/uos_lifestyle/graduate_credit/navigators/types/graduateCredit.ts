import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ApiResponse} from '../../types';

export type GraduateCreditStackParamList = {
  graduate_credit_main: undefined;
  graduate_credit_detail: {Props: ApiResponse; type: string};
};

// navigation props
export type GraduateCreditNavigationProp =
  NativeStackNavigationProp<GraduateCreditStackParamList>;
