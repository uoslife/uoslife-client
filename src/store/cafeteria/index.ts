import {atom} from 'jotai';
import {atomWithCache} from 'jotai-cache';
import DateUtils from '../../utils/date';
import UtilityService, {GetCafeteriaItemsType} from '../../services/utility';

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

export const mainScreenCafeteriaItemAtom = atom<Promise<GetCafeteriaItemsType>>(
  async () => {
    const mealTime = date.currentMealTime;
    const {commonDate} = date;
    const {displayDate} = date;
    return await UtilityService.getCafeteriaItems({
      mealTime,
      commonDate,
      displayDate,
    });
  },
);

export const cachedCafeteriaItemAtom = atomWithCache<
  Promise<GetCafeteriaItemsType>
>(async get => {
  const mealTime = get(cafeteriaMealTimeAtom);
  const commonDate = get(cafeteriaCommonDateAtom);
  const displayDate = get(cafeteriaDisplayDateAtom);

  return await UtilityService.getCafeteriaItems({
    mealTime,
    commonDate,
    displayDate,
  });
});

export default cachedCafeteriaItemAtom;
