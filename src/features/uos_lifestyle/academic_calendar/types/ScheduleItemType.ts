import {ISchedule} from '../api/academicCalendarAPI.type';

export type ScheduleItemType = ISchedule & {
  onClick: (param: number, flag: boolean) => void;
};
