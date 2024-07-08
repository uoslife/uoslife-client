import {
  ServiceFunc,
  ServiceFuncWithoutParams,
} from '../../../../api/services/type';
import * as Type from './academicCalendarAPI.type';

export default interface AcademicCalendarService {
  getSearchedSchedule: ServiceFunc<
    Type.GetSearchedScheduleParams,
    Type.ISchedule[]
  >;
  getMonthlySchedule: ServiceFunc<
    Type.GetMonthlyScheduleParams,
    Type.ISchedule[]
  >;
  getMySchedule: ServiceFuncWithoutParams<Type.ISchedule[]>;

  setBookmark: ServiceFunc<Type.SetBookmarkParams, undefined>;
  setNotification: ServiceFunc<Type.SetNotificationParams, Type.ISchedule[]>;
  deleteNotification: ServiceFunc<Type.DeleteNotificationParams, undefined>;
}
