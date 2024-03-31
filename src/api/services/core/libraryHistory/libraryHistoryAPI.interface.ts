import {ServiceFunc} from '../../type';
import * as Type from './libraryHistoryAPI.type';

export default interface LibraryHisoryService {
  getLibraryHistories: ServiceFunc<
    Type.GetLibraryHistoriesParams,
    Type.GetLibraryHistoriesResponse
  >;
  saveLibraryHistories: ServiceFunc<
    Type.SaveLibraryHistoriesParams,
    Type.SaveLibraryHistoriesResponse
  >;
}
