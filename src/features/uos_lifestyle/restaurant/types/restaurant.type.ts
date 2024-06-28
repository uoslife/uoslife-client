import {
  foodCategoryList,
  locationList,
  reversedFoodCategoryList,
  reversedLocationList,
} from '../constants/restaurant';

export type LocationType = keyof typeof locationList;
export type FoodCategoryType = keyof typeof foodCategoryList;
export type ReversedFoodCategoryType = keyof typeof reversedFoodCategoryList;
export type ReversedLocationListType = keyof typeof reversedLocationList;
