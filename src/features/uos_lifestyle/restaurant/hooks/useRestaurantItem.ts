import {
  useQuery,
  useInfiniteQuery,
  InfiniteData,
  UseInfiniteQueryResult,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from '@tanstack/react-query';
import {
  RestaurantItemType,
  FoodCategoryType,
  LocationType,
  RestaurantListResponse,
  TopRestaurantListResponse,
  RestaurantClickResponse,
} from '../types/restaurant.type';
import {get, post, del} from '../../../../api/core/methods';
import {generateQueryString} from '../../../announcement/utils/getQueryStringFromParams';

const useRestaurantItem = () => {
  const useRestaurantQuery = ({
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

  const getTopRestaurantItem = useQuery<TopRestaurantListResponse>({
    queryKey: ['getRestaurantData', 'top'],
    queryFn: () => get(`core/restaurant/top`),
    refetchOnWindowFocus: true,
  });
  const useRestaurantLikeMutation = ({
    isLike,
    location,
    foodCategory,
  }: {
    isLike: boolean;
    location: LocationType;
    foodCategory: FoodCategoryType;
  }) => {
    return useMutation({
      mutationFn: (
        item: RestaurantItemType,
      ): Promise<RestaurantClickResponse> => {
        if (item.like) {
          return del(`core/restaurant/like/${item.id}`);
        }
        return post(`core/restaurant/like/${item.id}`);
      },
      onMutate: async (clickedRestaurant: RestaurantItemType) => {
        queryClient.setQueryData(
          ['getRestaurantData', isLike, location, foodCategory],
          (prev: InfiniteData<RestaurantListResponse>) => {
            prev.pages.map((page: RestaurantListResponse) => {
              return page.data.map(prevRestaurant => {
                if (prevRestaurant.id === clickedRestaurant.id) {
                  return {
                    ...prevRestaurant,
                    like: !prevRestaurant.like,
                  };
                }
                return prevRestaurant;
              });
            });
            return prev;
          },
        );
        queryClient.setQueryData(
          ['getRestaurantData', 'top'],
          (prev: TopRestaurantListResponse) => {
            return {
              restaurants: prev.restaurants.map(prevRestaurant => {
                if (prevRestaurant.id === clickedRestaurant.id) {
                  return {
                    ...prevRestaurant,
                    likeCount: prevRestaurant.like
                      ? prevRestaurant.likeCount - 1
                      : prevRestaurant.likeCount + 1,
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
          queryKey: ['getRestaurantData', isLike, location, foodCategory],
        });
        queryClient.invalidateQueries({
          queryKey: ['getRestaurantData', 'top'],
        });
      },
    });
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
        (prev: TopRestaurantListResponse) => {
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
    useRestaurantQuery,
    getTopRestaurantItem,
    useRestaurantLikeMutation,
    handleClickItem,
  };
};
export default useRestaurantItem;
