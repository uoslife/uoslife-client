import {colors} from '@uoslife/design-system';

export type SeatStatusType =
  | 'AVAILABLE'
  | 'RESERVED'
  | 'SPECIFIED'
  | 'NOT_AVAILABLE';
export type SeatStatusEnumType = Record<SeatStatusType, string>;
export type SeatStatusColorType = Record<SeatStatusType, string>;

export const SeatStatusEnum: SeatStatusEnumType = {
  AVAILABLE: '사용가능',
  RESERVED: '사용중',
  SPECIFIED: '지정석',
  NOT_AVAILABLE: '사용불가',
};

export const SeatStatusColorEnum: SeatStatusColorType = {
  AVAILABLE: colors.grey40,
  RESERVED: colors.primaryBrand,
  SPECIFIED: colors.secondaryBrand,
  NOT_AVAILABLE: colors.red,
};
