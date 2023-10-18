import {ServiceFunc} from '../../type';
import * as Type from './studentIdQrAPI.type';

export default interface StudentIdQrService {
  getStudentIdQr: ServiceFunc<
    Type.GetStudentIdQrParams,
    Type.GetStudentIdQrResponse
  >;
}
