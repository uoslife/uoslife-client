import {get, post, del} from '../../../core/methods';
import MygradeService from './hiddenGradeAPI.interface';
import * as Type from './hiddenGradeAPI.type';

const MygradeAPI: MygradeService = {
  getHiddenGrade: () => get<Type.GetHiddenGradeRes>('core/hidden-grade'),
  updateHiddenGrade: () => post<Type.UpdateHiddenGradeRes>('core/hidden-grade'),
  submitHiddenGradeVote: ({courseId}) =>
    post<Type.SubmitHiddenGradeVoteRes>(`core/hidden-grade/${courseId}/vote`),
  cancelHiddenGradeVote: ({courseId}) =>
    del<Type.CancelHiddenGradeVoteRes>(`core/hidden-grade/${courseId}/vote`),
};
export default MygradeAPI;
