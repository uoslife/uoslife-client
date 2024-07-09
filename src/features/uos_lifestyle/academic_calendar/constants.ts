export type ScheduleStatusType = 'ALL' | 'NOTIFICATION' | 'IN_PROGRESS';
export type ScheduleStatusEnumType = Record<ScheduleStatusType, string>;

export type ScheduleTabType = 'ALL' | 'MY_SCHEDULE';
export type ScheduleTabEnumType = Record<ScheduleTabType, string>;

export const STATUSES: ScheduleStatusType[] = [
  'ALL',
  'NOTIFICATION',
  'IN_PROGRESS',
] as const;

export const ScheduleTabEnum: ScheduleTabEnumType = {
  ALL: '모든 일정',
  MY_SCHEDULE: '내 일정',
};
