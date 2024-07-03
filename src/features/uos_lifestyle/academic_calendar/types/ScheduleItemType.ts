import {ISchedule} from '../api/academicCalendarAPI.type';

export type ScheduleItemType = ISchedule & {
  onClick?: () => void;
};
