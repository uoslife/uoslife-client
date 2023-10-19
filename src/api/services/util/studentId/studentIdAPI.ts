import {get} from '../../../core/methods';
import StudentIdService from './studentIdAPI.interface';
import * as Type from './studentIdAPI.type';

const StudentIdAPI: StudentIdService = {
  getStudentId: () => get<Type.GetStudentIdResponse>(`utility/mobile-id`),
};

export default StudentIdAPI;
