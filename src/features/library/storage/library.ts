import {ReservationStatusTypeFromServer} from '../../../api/services/util/library/libraryAPI.type';
import storage from '../../../storage';

export const librarySeatStartTime = storage.getString('librarySeatStartTime');
export const libraryUsingStatus = storage.getString('libraryUsingStatus') as
  | ReservationStatusTypeFromServer
  | undefined;

export const setLibrarySeatStartTime = (seatStartTime: string) => {
  storage.set('librarySeatStartTime', seatStartTime);
};
export const setLibraryUsingStatus = (
  usingStatus: ReservationStatusTypeFromServer,
) => {
  storage.set('libraryUsingStatus', usingStatus);
};

export const deleteLibrarySeatStartTime = () => {
  storage.delete('librarySeatStartTime');
};
export const deleteLibraryUsingStatus = () => {
  storage.delete('libraryUsingStatus');
};
