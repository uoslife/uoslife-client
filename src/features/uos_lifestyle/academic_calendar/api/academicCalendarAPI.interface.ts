import {
  ServiceFunc,
  ServiceFuncWithoutParams,
} from '../../../../api/services/type';
import * as Type from './academicCalendarAPI.type';

export default interface AcademicCalendarService {
  getSearchedSchedule: ServiceFunc<
    Type.GetSearchedScheduleParams,
    Type.GetSearchedScheduleResponse
  >;
  getMonthlySchedule: ServiceFunc<
    Type.GetMonthlyScheduleParams,
    Type.GetMonthlyScheduleResponse
  >;
  getMySchedule: ServiceFuncWithoutParams<Type.GetMyScheduleResponse>;
}
