import {atom} from 'jotai';
import {atomWithCache} from 'jotai-cache';
import {UtilAPI} from '../../api/services';
import {
  GetCafeteriasResponse,
  MealTimeType,
} from '../../api/services/util/cafeteria/cafeteriaAPI.type';
import DateUtils from '../../utils/date';

type CafeteriaItemType = {
  commonDate: string;
  displayDate: string;
  mealTime: MealTimeType;
  items?: GetCafeteriasResponse;
};

const date = new DateUtils(new Date());

export const cafeteriaMealTimeAtom = atom<DateUtils['currentMealTime']>(
  date.currentMealTime,
);
export const cafeteriaCommonDateAtom = atom<DateUtils['commonDate']>(
  date.commonDate,
);
export const cafeteriaDisplayDateAtom = atom<DateUtils['displayDate']>(
  date.displayDate,
);

export const cachedCafeteriaItemAtom = atomWithCache<
  Promise<CafeteriaItemType>
>(async get => {
  const mealTime = get(cafeteriaMealTimeAtom);
  const commonDate = get(cafeteriaCommonDateAtom);
  const displayDate = get(cafeteriaDisplayDateAtom);

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
});

export default cachedCafeteriaItemAtom;
