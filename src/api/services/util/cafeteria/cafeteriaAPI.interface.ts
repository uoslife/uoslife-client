import {ServiceFunc} from '../../type';
import * as Type from './cafeteriaAPI.type';

export default interface NotificationService {
  getCafeterias: ServiceFunc<
    Type.GetCafeteriasParams,
    Type.GetCafeteriasResponse
  >;
}
