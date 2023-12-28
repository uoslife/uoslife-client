import {get} from '../../../core/methods';
import MygradeService from './mygradeAPI.interface';
import * as Type from './mygradeAPI.type';

const MygradeAPI: MygradeService = {
  getMygrade: () => get<Type.GetMygradeRes>('core/mygrade'),
  getMygradeCurrentAverageGrade: () =>
    get<Type.GetMygradeCurrentAverageGradeRes>(
      'core/mygrade/current-average-grade',
    ),
};
export default MygradeAPI;
