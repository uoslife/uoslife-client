import {ServiceFunc} from '../../type';
import * as Type from './libraryAPI.type';

export default interface LibraryService {
  getAllLibraryStatus: ServiceFunc<
    Type.GetAllLibraryStatusParams,
    Type.GetAllLibraryStatusRes
  >;
  getLibraryReservation: ServiceFunc<
    Type.GetLibraryReservationParams,
    Type.GetLibraryReservationRes
  >;
}
