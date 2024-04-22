import {GetSeatListRes} from '../../api/services/util/library/libraryAPI.type';
import {
  ROOM_2_FOR_DISABLED_PERSON_LIST,
  ROOM_4_FOR_DISABLED_PERSON_LIST,
} from '../../configs/utility/librarySeatingChart/forDisabledPersonList';
import {RoomNameType} from '../../configs/utility/librarySeatingChart/roomName';

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
