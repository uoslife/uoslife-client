import {ServiceFunc} from '../../type';
import * as Type from './cafeteriaAPI.type';

export default interface NotificationService {
  getCafeteriasWithId: ServiceFunc<
    Type.GetCafeteriasWithIdParams,
    Type.GetCafeteriasWithIdResponse
  >;
  getCafeteriasWithDate: ServiceFunc<
    Type.GetCafeteriasWithDateParams,
    Type.GetCafeteriasWithDateResponse
  >;
}
