import {LibraryRankingMajorType} from '../../../../configs/utility/libraryRanking/libraryRanking';
import {
  LibraryRankingTabsType,
  LibraryRoomStatusTabsType,
} from '../../../../configs/utility/libraryTabs';

export type LibraryStatusType = {
  type: LibraryStatusTypeType;
  item: Array<LibraryStatusItemType>;
};

export type LibraryStatusTypeType = {
  code: string;
  korName: string;
  requestName: string;
};

export type LibraryStatusItemType = {
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

export type ReservationStatusTypeFromServer =
  | 'SEAT' // 좌석
  | 'STUDY_ROOM' // 스터디룸
  | 'OUTSIDE'; // 외출

export type LibraryReservationType = {
  status: ReservationStatusTypeFromServer;
  seatRoomName: string;
  seatNo: string;
  seatUseTime: string;
  reservationMinutes: string;
  seatStartTime: string;
  seatEndTime: string;
  remainingSeconds: number;
  extendRemaining: number;
  extendUsed: number;
  studyRoomName: string;
  studyRoomNo: string;
  studyRoomUseTime: string;
  studyReserveStat: string;
};

export type GetAllLibraryStatusParams = {};

export type GetAllLibraryStatusRes = Array<LibraryStatusType>;

export type GetLibraryRoomStatusParams = {type: LibraryRoomStatusTabsType};

export type GetLibraryRoomStatusRes = {item: Array<LibraryStatusItemType>};

export type GetLibraryReservationParams = {};

export type GetLibraryReservationRes = LibraryReservationType;

export type GetLibraryRankingParams = {
  major: LibraryRankingMajorType;
  duration: LibraryRankingTabsType;
  pageable?: {
    page: number;
    size: number;
  };
};

export type GetLibraryRankingRes = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: LibraryRankingContentType[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type LibraryRankingContentType = {
  rank: number;
  time: number;
  userId: number;
  nickname: string;
  departmentName: string;
};

export type GetMyLibraryRankingParams = {
  major: LibraryRankingMajorType;
  duration: LibraryRankingTabsType;
};
export type GetMyLibraryRankingRes = {
  rank: number;
  time: number;
  userId: number;
  nickname: string;
  totalRank: number;
};
