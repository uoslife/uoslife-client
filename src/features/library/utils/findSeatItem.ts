import {GetSeatListRes} from '../../../api/services/util/library/libraryAPI.type';
import {ROOM_6_FOR_DESKTOP_SEAT} from '../constants/librarySeatingChart/forDesktopSeat';
import {
  ROOM_2_FOR_DISABLED_PERSON_LIST,
  ROOM_4_FOR_DISABLED_PERSON_LIST,
} from '../constants/librarySeatingChart/forDisabledPersonList';
import {RoomNameType} from '../constants/librarySeatingChart/roomName';

export const findSeatStatusBySeatId = (
  seatList: GetSeatListRes | undefined,
  seatId: number,
) => {
  return seatList?.find(item => item.seatNumber === seatId)?.status;
};

export const findForDisabledPerson = (
  roomNumber: RoomNameType,
  seatId: number,
): boolean | null => {
  switch (roomNumber) {
    case '2':
      return (
        ROOM_2_FOR_DISABLED_PERSON_LIST.some(item => item === seatId) ?? null
      );
    case '4':
      return (
        ROOM_4_FOR_DISABLED_PERSON_LIST.some(item => item === seatId) ?? null
      );
    default:
      return null;
  }
};
export const findForDesktopSeat = (
  roomNumber: RoomNameType,
  seatId: number,
): boolean | null => {
  switch (roomNumber) {
    case '6':
      return ROOM_6_FOR_DESKTOP_SEAT.some(item => item === seatId) ?? null;
    default:
      return null;
  }
};
