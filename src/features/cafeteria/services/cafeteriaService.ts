import {UtilAPI} from '../../../api/services';
import {GetCafeteriaItemsParams, GetCafeteriaItemsType} from '../types';

export class CafeteriaService {
  static async getCafeteriaItems({
    mealTime,
    commonDate,
    displayDate,
  }: GetCafeteriaItemsParams): Promise<GetCafeteriaItemsType> {
    try {
      const response = await UtilAPI.getCafeterias({
        mealTime,
        openDate: commonDate,
      });
      return {
        commonDate,
        mealTime,
        displayDate,
        items: response,
      };
    } catch (error) {
      return {
        commonDate,
        mealTime,
        displayDate,
      };
    }
  }
}
