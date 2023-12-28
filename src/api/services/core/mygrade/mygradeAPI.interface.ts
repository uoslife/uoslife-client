import {ServiceFunc} from '../../type';
import * as Type from './mygradeAPI.type';

export default interface MygradeService {
  getMygrade: ServiceFunc<Type.GetMygradeParams, Type.GetMygradeRes>;
  getMygradeCurrentAverageGrade: ServiceFunc<
    Type.GetMygradeCurrentAverageGradeParams,
    Type.GetMygradeCurrentAverageGradeRes
  >;
}
