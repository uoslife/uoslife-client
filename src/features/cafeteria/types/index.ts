import {
  MealTimeType,
  GetCafeteriasResponse,
} from '../../../api/services/util/cafeteria/cafeteriaAPI.type';
import DateUtils from '../utils/date';

export type GetCafeteriaItemsType = {
  commonDate: string;
  displayDate: string;
  mealTime: MealTimeType;
  items?: GetCafeteriasResponse;
};

export type GetCafeteriaItemsParams = {
  mealTime: MealTimeType;
  commonDate: DateUtils['commonDate'];
  displayDate: DateUtils['displayDate'];
};
