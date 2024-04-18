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
  getLibraryRanking: params =>
    get<Type.GetLibraryRankingRes>(
      `utility/libraries/leader-board?major=${params?.major}&duration=${params?.duration}&page=${
        params?.pageable?.page ?? 0
      }&size=${params?.pageable?.size ?? 3}`,
    ),
  getMyLibraryRanking: params =>
    get<Type.GetMyLibraryRankingRes>(
      `utility/libraries/leader-board/me?major=${params?.major}&duration=${params?.duration}`,
    ),
};
export default LibraryAPI;
