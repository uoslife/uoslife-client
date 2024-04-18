import {
  ROOM_2_FOR_DISABLED_PERSON_LIST,
  ROOM_4_FOR_DISABLED_PERSON_LIST,
} from '../../configs/utility/librarySeatingChart/forDisabledPersonList';
import {RoomNameType} from '../../configs/utility/librarySeatingChart/roomName';
import {SeatStatusType} from '../../configs/utility/librarySeatingChart/seatStatus';

const mock: Array<{seatId: number; status: SeatStatusType}> = [
  {
    seatId: 12,
    status: 'NOT_AVAILABLE',
  },
  {
    seatId: 14,
    status: 'RESERVED',
  },
  {
    seatId: 23,
    status: 'SPECIFIED',
  },
];

export const findSeatStatusBySeatId = (seatId: number) => {
  return mock.find(item => item.seatId === seatId)?.status;
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
