import {foodCategoryList, locationList} from '../constants/restaurant';

export type LocationType = keyof typeof locationList;
export type FoodCategoryType = keyof typeof foodCategoryList;
