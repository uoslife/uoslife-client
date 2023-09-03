type LibraryAPIResType = {
  statusCode: number;
  message: string;
};

type LibraryType = 'ECONOMY' | 'LAW' | 'CENTRAL' | 'HASHTAG_UOS';

type LibraryItem = {
  seat_no_s: string;
  chk_holiday: string;
  time_start: string;
  seat_no_e: string;
  holiday_msg: string;
  use_rate: string;
  await_cnt: string;
  room_no: string;
  total_seat: string;
  room_name: string;
  use_seat: string;
  time_end: string;
  room_e_name: string;
  room_gb: string;
  remain_seat: string;
};

export type GetLibraryStatusParams = {
  type: LibraryType;
};

export type GetLibraryStatusRes = {
  item: LibraryItem[];
} & LibraryAPIResType;

export type GetUserStatusParams = {
  studentId: string;
};

export type GetUserStatusRes = {
  name: string;
  id: string;
  library: LibraryType;
  seat: string;
  reservation: string;
  reservationMinutes: string;
  reservationStartedAt: string;
  reservationEndsAt: string;
  remainingSeconds: number;
  extendRemaining: number;
  extendUsed: number;
} & LibraryAPIResType;
