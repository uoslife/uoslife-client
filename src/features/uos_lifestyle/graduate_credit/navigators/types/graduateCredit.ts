import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ApiResponse} from '../../types';
import {SubjectCreditListRes} from '../../../../../api/services/core/graduateCredit/graduateCreditAPI.type';

export type GraduateCreditStackParamList = {
  graduate_credit_main: undefined;
  graduate_credit_detail: {
    allCreditInfo: ApiResponse;
    generalCreditInfo: SubjectCreditListRes;
    type: string;
  };
};

// navigation props
export type GraduateCreditNavigationProp =
  NativeStackNavigationProp<GraduateCreditStackParamList>;
