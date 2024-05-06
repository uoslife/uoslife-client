import {get, post} from '../../../core/methods';
import DeviceService from './libraryHistoryAPI.interface';
import * as Type from './libraryHistoryAPI.type';

const DEFAULT_LIBRARY_HISTORIES_YEAR = 2023;

const LibraryHistoryAPI: DeviceService = {
  getLibraryHistories: params =>
    get<Type.GetLibraryHistoriesResponse>(
      `core/library-histories/recap?year=${
        params?.year || DEFAULT_LIBRARY_HISTORIES_YEAR
      }`,
    ),
  saveLibraryHistories: params =>
    post<Type.SaveLibraryHistoriesResponse>(
      `core/library-histories/save?year=${
        params?.year || DEFAULT_LIBRARY_HISTORIES_YEAR
      }`,
    ),
};
export default LibraryHistoryAPI;
