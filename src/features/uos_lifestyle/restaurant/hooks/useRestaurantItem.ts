import {
  useQuery,
  useInfiniteQuery,
  InfiniteData,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import {FoodCategoryType, LocationType} from '../types/restaurant.type';
import {RestaurantItemType} from '../RestaurantScreen';
import {foodCategoryList, locationList} from '../constants/restaurant';
import {get} from '../../../../api/core/methods';
import {generateQueryString} from '../../../announcement/utils/getQueryStringFromParams';

export interface RestaurantListResponse {
  page: number;
  size: number;
  data: RestaurantItemType[];
}
const useRestaurantItem = ({
  isLike,
  location,
  foodCategory,
}): {
  isLike: boolean;
  location: LocationType;
  foodCategory: FoodCategoryType;
} => {
  const useRestaurantList = (): UseInfiniteQueryResult<
    InfiniteData<RestaurantListResponse>,
    Error
  > => {
    return useInfiniteQuery({
      queryKey: ['getRestaurantData', isLike, location, foodCategory],
      queryFn: async ({pageParam = 0}) => {
        return await get(
          `core/restaurant?${generateQueryString({
            page: pageParam,
            size: 10,
            isLike,
            location: locationList[location],
            'restaurant-type': foodCategoryList[foodCategory],
          })}`,
        );
      },
      getNextPageParam: (lastPage, allPages, lastPageParam) =>
        (lastPageParam as number) + 1,
      initialPageParam: 0,
    });
  };

  const getTopRestaurantItem = useQuery({
    queryKey: ['top'],
    queryFn: () => get(`core/restaurant/top`),
  });
  return {getTopRestaurantItem};
};
export default useRestaurantItem;
