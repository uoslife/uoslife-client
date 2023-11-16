import {get} from '../../../core/methods';
import CafeteriaService from './cafeteriaAPI.interface';
import * as Type from './cafeteriaAPI.type';

const CafeteriaAPI: CafeteriaService = {
  getCafeterias: params =>
    get<Type.GetCafeteriasResponse>(
      `utility/cafeterias/${params.openDate}?mealTime=${params.mealTime}`,
    ),
};
export default CafeteriaAPI;
