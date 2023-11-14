export type CafeteriaItemAttributesMenuListType = {
  menu: string;
  price: string;
  sideDish?: string;
  sidePrice?: string;
};

export type CafeteriaItemAttributesType = {
  corner?: string;
  menuList: Array<CafeteriaItemAttributesMenuListType>;
};

export type CafeteriaItemType = {
  location: string;
  operationTime: string;
  attributes: Array<CafeteriaItemAttributesType>;
};

export type MealTimeType = 'BREAKFAST' | 'LUNCH' | 'DINNER';

export type GetCafeteriasParams = {
  openDate: string;
  mealTime: MealTimeType;
};

export type GetCafeteriasResponse = Array<CafeteriaItemType>;
