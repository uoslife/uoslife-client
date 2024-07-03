export interface ISchedule {
  scheduleId: number;
  title: string;
  startDate: string;
  endDate: string;
  isBookmarked: boolean;
  setNotification?: boolean;
}

export type GetSearchedScheduleParams = {keyword: string};

export type GetMonthlyScheduleParams = {year: number; month: number};
