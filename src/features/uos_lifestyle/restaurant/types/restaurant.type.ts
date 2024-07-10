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

// export interface RestaurantListResponse {
//   page: number;
//   size: number;
//   data: RestaurantItemType[];
// }

export interface RestaurantListResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: [
    {
      id: number;
      name: 'string';
      location: 'TOTAL';
      restaurantType: 'TOTAL';
      clickCount: number;
      likeCount: number;
      isLike: true;
    },
  ];
  number: number;
  sort: {
    empty: true;
    unsorted: true;
    sorted: true;
  };
  first: true;
  last: true;
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: true;
      unsorted: true;
      sorted: true;
    };
    unpaged: true;
    paged: true;
    pageNumber: number;
    pageSize: number;
  };
  empty: true;
}

export interface TopRestaurantListResponse {
  restaurants: RestaurantItemType[];
}

export interface RestaurantClickResponse {
  id: number;
  name: string;
  clickCount: number;
}

export type RestaurantItemType = {
  id: number;
  name: string;
  mapLink: {
    naverMapLink: string;
    kakaoMapLink: string;
  };
  location: LocationType;
  restaurantType: FoodCategoryType;
  likeCount: number;
  clickCount: number;
  isLike: boolean;
};
