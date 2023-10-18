import {get} from '../../../core/methods';
import StudentIdQrService from './studentIdQrAPI.interface';
import * as Type from './studentIdQrAPI.type';

const StudentIdQrAPI: StudentIdQrService = {
  getStudentIdQr: () => get<Type.GetStudentIdQrResponse>(`utility/mobile-id`),
};

export default StudentIdQrAPI;
