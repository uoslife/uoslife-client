import {ServiceFunc, ServiceFuncWithoutParams} from '../../type';
import * as Type from './hiddenGradeAPI.type';

export default interface MygradeService {
  getHiddenGrade: ServiceFuncWithoutParams<Type.GetHiddenGradeRes>;
  updateHiddenGrade: ServiceFuncWithoutParams<Type.UpdateHiddenGradeRes>;
  submitHiddenGradeVote: ServiceFunc<
    Type.SubmitHiddenGradeVoteParams,
    Type.SubmitHiddenGradeVoteRes
  >;
  cancelHiddenGradeVote: ServiceFunc<
    Type.CancelHiddenGradeVoteParams,
    Type.CancelHiddenGradeVoteRes
  >;
}
