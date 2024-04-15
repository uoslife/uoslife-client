import {get} from '../../../core/methods';
import LibraryService from './libraryAPI.interface';
import * as Type from './libraryAPI.type';

const LibraryAPI: LibraryService = {
  getAllLibraryStatus: () =>
    get<Type.GetAllLibraryStatusRes>(`utility/libraries/status/all`),
  getLibraryRoomStatus: params =>
    get<Type.GetLibraryRoomStatusRes>(
      `utility/libraries/status?type=${params?.type}`,
    ),
  getLibraryReservation: () =>
    get<Type.GetLibraryReservationRes>(`utility/libraries/reservation`),
};
export default LibraryAPI;
