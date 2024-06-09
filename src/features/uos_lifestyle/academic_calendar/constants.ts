export const STATUSES = [
  'ALL',
  'NOTIFICATION',
  'IN_PROGRESS',
  'ON_FILTER',
] as const;
export type Status = (typeof STATUSES)[number];
