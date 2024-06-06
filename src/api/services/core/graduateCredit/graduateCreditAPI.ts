import {get, patch, post} from '../../../core/methods';
import GraduateCreditService from './graduateCreditAPI.interface';
import * as Type from './graduateCreditAPI.type';

const GraduateCreditAPI: GraduateCreditService = {
  getAllGraduateCredit: () => get<Type.GraduateCreditRes>('core/mycredit'),
  getNecessarySubjectCredit: () =>
    get<Type.SubjectCreditListRes>('core/mycredit/general-education'),
  updateGraduateCredit: () =>
    patch<Type.GraduateCreditRes>('core/mycredit', {}),
  createGraduateCredit: () => post<Type.GraduateCreditRes>('core/mycredit'),
};
export default GraduateCreditAPI;
