type ScheduleType = {
  scheduleId: number;
  title: string;
  startDate: string;
  endDate: string;
  isBookmarked?: boolean;
  onAlarm?: boolean;
  onClick?: () => void;
};
