import {ServiceFunc} from '../../type';
import * as Type from './LibraryAPI.type';

export default interface LibraryService {
  getLibraryStatus: ServiceFunc<
    Type.GetLibraryStatusParams,
    Type.GetLibraryStatusRes
  >;
  getUserStatus: ServiceFunc<Type.GetUserStatusParams, Type.GetUserStatusRes>;
}
