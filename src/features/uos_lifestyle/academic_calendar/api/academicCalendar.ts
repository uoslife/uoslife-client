import {get, put, del} from '../../../../api/core/methods';
import AcademicCalendarService from './academicCalendarAPI.interface';
import * as Type from './academicCalendarAPI.type';

const DEFAULT_YEAR = 2024;

const AcademicCalendarAPI: AcademicCalendarService = {
  getSearchedSchedule: params =>
    get<Type.ISchedule[]>(
      `utility/schedules/search?keyword=${params?.keyword}`,
    ),
  getMonthlySchedule: params =>
    get<Type.ISchedule[]>(
      `utility/schedules/calendar?year=${
        params?.year || DEFAULT_YEAR
      }&month=${params?.month}`,
    ),
  getMySchedule: () => get<Type.ISchedule[]>('utility/schedules/me'),
};

export default AcademicCalendarAPI;
