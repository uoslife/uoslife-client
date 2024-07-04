export interface ISchedule {
  scheduleId: number;
  title: string;
  startDate: string;
  endDate: string;
  isBookmarked: boolean;
  setNotification?: boolean;
  notificationId?: string[];
}

export type GetSearchedScheduleParams = {keyword: string};

export type GetMonthlyScheduleParams = {year?: number; month: number};

export type SetBookmarkParams = {scheduleId: number; isBookmarked: boolean};
export type SetNotificationParams = {scheduleId: number; notifyAt: string};
export type DeleteNotificationParams = {notificationId: number[]};
