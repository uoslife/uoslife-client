import {get} from '../../../core/methods';
import LibraryService from './LibraryAPI.interface';
import * as Type from './LibraryAPI.type';

const LibraryAPI: LibraryService = {
  getLibraryStatus: params =>
    get<Type.GetLibraryStatusRes>(
      `/utility/library/status?type=${params.type}`,
    ),
  getUserStatus: params =>
    get<Type.GetUserStatusRes>(
      `/utility/library/reservation?studentId=${params.studentId}`,
    ),
};

export default LibraryAPI;
