export type ScheduleItemType = {
  scheduleId: number;
  title: string;
  startDate: string;
  endDate: string;
  isBookmarked: boolean;
  setNotification?: boolean;
};

export type GetSearchedScheduleParams = {keyword: string};
export type GetSearchedScheduleResponse = ScheduleItemType[];

export type GetMonthlyScheduleParams = {year: number; month: number};
export type GetMonthlyScheduleResponse = ScheduleItemType[];

export type GetMyScheduleResponse = ScheduleItemType[];
