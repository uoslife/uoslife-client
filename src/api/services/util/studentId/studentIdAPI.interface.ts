import {ServiceFunc} from '../../type';
import * as Type from './studentIdAPI.type';

export default interface StudentIdService {
  getStudentId: ServiceFunc<Type.GetStudentIdParams, Type.GetStudentIdResponse>;
}
