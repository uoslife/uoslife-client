import {
  useQuery,
  useInfiniteQuery,
  InfiniteData,
  UseInfiniteQueryResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {FoodCategoryType, LocationType} from '../types/restaurant.type';
import {RestaurantItemType} from '../RestaurantScreen';
import {get, post} from '../../../../api/core/methods';
import {generateQueryString} from '../../../announcement/utils/getQueryStringFromParams';
import storage from '../../../../storage';

console.log(storage.getString('accessToken'));

export interface RestaurantListResponse {
  page: number;
  size: number;
  data: RestaurantItemType[];
}

const useRestaurantItem = () => {
  const useRestaurantList = ({
    isLike,
    location,
    foodCategory,
  }: {
    isLike: boolean;
    location: LocationType;
    foodCategory: FoodCategoryType;
  }): UseInfiniteQueryResult<InfiniteData<RestaurantListResponse>, Error> => {
    return useInfiniteQuery({
      queryKey: ['getRestaurantData', isLike, location, foodCategory],
      queryFn: async ({pageParam = 0}) => {
        return await get(
          `core/restaurant?${generateQueryString({
            page: pageParam,
            size: 10,
            isLike,
            location,
            'restaurant-type': foodCategory,
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

  const likeMutation = useMutation({
    mutationKey: ['getRestaurantData'],
    mutationFn: (id: number) => post(`core/restaurant/like/${id}`),
    onSuccess: () => {
      console.log('요청 성공');
    },
    onError: () => {
      console.error('에러 발생');
    },
    onSettled: () => {
      console.log('결과에 관계 없이 무언가 실행됨');
    },
  });

  const handleClickLikeButton = (id: number) => {
    // likeMutation.mutate(1);
  };
  return {useRestaurantList, getTopRestaurantItem, handleClickLikeButton};
};
export default useRestaurantItem;
