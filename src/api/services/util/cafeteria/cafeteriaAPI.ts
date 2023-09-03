import {get} from '../../../core/methods';
import CafeteriaService from './cafeteriaAPI.interface';
import * as Type from './cafeteriaAPI.type';

const CafeteriaAPI: CafeteriaService = {
  getCafeteriasWithId: params =>
    get<Type.GetCafeteriasWithIdResponse>(`api/cafeterias/${params.id}`),

  getCafeteriasWithDate: params =>
    get<Type.GetCafeteriasWithDateResponse>(
      `api/cafeterias/date/${params.date}`,
    ),
};
export default CafeteriaAPI;
