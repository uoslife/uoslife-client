import {
  useQuery,
  useInfiniteQuery,
  InfiniteData,
  UseInfiniteQueryResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  RestaurantItemType,
  FoodCategoryType,
  LocationType,
  RestaurantListResponse,
  RestaurantClickResponse,
} from '../types/restaurant.type';
import {get, post, del} from '../../../../api/core/methods';
import {generateQueryString} from '../../../announcement/utils/getQueryStringFromParams';

const useRestaurantItem = () => {
  const queryClient = useQueryClient();
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
            pagable: {
              page: pageParam,
              size: 10,
              sort: 'sorted',
            },
            isLike,
            location,
            'restaurant-type': foodCategory,
          })}`,
        );
      },
      getNextPageParam: (lastPage: RestaurantListResponse) => {
        return lastPage.pageable.pageNumber + 1;
      },
      initialPageParam: 0,
    });
  };

  const getTopRestaurantItem = useQuery<RestaurantItemType[]>({
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
        if (item.isLike) {
          return del(`core/restaurant/${item.id}/like`);
        }
        return post(`core/restaurant/${item.id}/like`);
      },
      onMutate: async (clickedRestaurant: RestaurantItemType) => {
        queryClient.setQueryData(
          ['getRestaurantData', isLike, location, foodCategory],
          (prev: InfiniteData<RestaurantListResponse>) => {
            return {
              ...prev,
              pages: prev.pages.map((page: RestaurantListResponse) => ({
                ...page,
                content: page.content.map(prevRestaurant => {
                  if (prevRestaurant.id === clickedRestaurant.id) {
                    return {
                      ...prevRestaurant,
                      isLike: !prevRestaurant.isLike,
                    };
                  }
                  return prevRestaurant;
                }),
              })),
            };
          },
        );
        queryClient.setQueryData(
          ['getRestaurantData', 'top'],
          (prev: RestaurantItemType[]) => {
            return prev.map(prevRestaurant => {
              if (prevRestaurant.id === clickedRestaurant.id) {
                return {
                  ...prevRestaurant,
                  likeCount: prevRestaurant.isLike
                    ? prevRestaurant.likeCount - 1
                    : prevRestaurant.likeCount + 1,
                  isLike: !prevRestaurant.isLike,
                };
              }
              return prevRestaurant;
            });
          },
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ['getRestaurantData', true],
        });
        queryClient.invalidateQueries({
          queryKey: ['getRestaurantData', 'top'],
        });
      },
    });
  };

  const handleClickItem = useMutation({
    mutationFn: (
      item: RestaurantItemType,
    ): Promise<RestaurantClickResponse> => {
      return get(`core/restaurant/${item.id}/click`);
    },
    onMutate: async (restaurant: RestaurantClickResponse) => {
      queryClient.setQueryData(
        ['getRestaurantData', 'top'],
        (prev: RestaurantItemType[]) => {
          return prev.map(prevRestaurant => {
            if (prevRestaurant.id === restaurant.id) {
              return {
                ...prevRestaurant,
                clickCount: prevRestaurant.clickCount + 1,
              };
            }
            return prevRestaurant;
          });
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
