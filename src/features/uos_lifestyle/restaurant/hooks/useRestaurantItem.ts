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
import {get} from '../../../../api/core/methods';
import {generateQueryString} from '../../../announcement/utils/getQueryStringFromParams';

export interface RestaurantListResponse {
  page: number;
  size: number;
  data: RestaurantItemType[];
}

export interface TopRestaurantListResponst {
  restaurants: RestaurantItemType[];
}

export interface RestaurantClickResponse {
  id: number;
  name: string;
  clickCount: number;
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

  const getTopRestaurantItem = useQuery<TopRestaurantListResponst>({
    queryKey: ['getRestaurantData', 'top'],
    queryFn: () => get(`core/restaurant/top`),
    refetchOnWindowFocus: true,
  });

  const handleClickLikeButton = (id: number) => {
    // likeMutation.mutate(1);
  };

  const queryClient = useQueryClient();
  const handleClickItem = useMutation({
    mutationFn: (
      item: RestaurantItemType,
    ): Promise<RestaurantClickResponse> => {
      return get(`core/restaurant/click/${item.id}`);
    },
    onMutate: async (restaurant: RestaurantClickResponse) => {
      queryClient.setQueryData(
        ['getRestaurantData', 'top'],
        (prev: TopRestaurantListResponst) => {
          return {
            restaurants: prev.restaurants.map(prevRestaurant => {
              if (prevRestaurant.id === restaurant.id) {
                return {
                  ...prevRestaurant,
                  clickCount: prevRestaurant.clickCount + 1,
                };
              }
              return prevRestaurant;
            }),
          };
        },
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['getRestaurantData', 'top'],
      });
    },
  });

  return {
    useRestaurantList,
    getTopRestaurantItem,
    handleClickLikeButton,
    handleClickItem,
  };
};
export default useRestaurantItem;
