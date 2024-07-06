export interface ISchedule {
  scheduleId: number;
  title: string;
  startDate: string;
  endDate: string;
  isBookmarked: boolean;
  setNotification?: boolean;
  notificationIds?: number[];
}

export type GetSearchedScheduleParams = {keyword: string};

export type GetMonthlyScheduleParams = {year?: number; month: number};

export type SetBookmarkParams = {scheduleId: number; isBookmarked: boolean};
export type SetNotificationParams = {scheduleId: number; notifyAt: string};
export type DeleteNotificationParams = {notificationIds: number[]};
