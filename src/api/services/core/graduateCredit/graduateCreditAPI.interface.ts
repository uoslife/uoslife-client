import {ServiceFuncWithoutParams} from '../../type';
import * as Type from './graduateCreditAPI.type';

export default interface GraduateCreditService {
  getAllGraduateCredit: ServiceFuncWithoutParams<Type.GraduateCreditRes>;
  getNecessarySubjectCredit: ServiceFuncWithoutParams<Type.SubjectCreditListRes>;
  updateGraduateCredit: ServiceFuncWithoutParams<Type.GraduateCreditRes>;
  createGraduateCredit: ServiceFuncWithoutParams<Type.GraduateCreditRes>;
}
