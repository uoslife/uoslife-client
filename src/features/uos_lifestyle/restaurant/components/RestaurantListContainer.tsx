import {View, FlatList, ListRenderItem, Dimensions} from 'react-native';
import {useState, useMemo} from 'react';
import {Txt} from '@uoslife/design-system';
import BorderSelect from '../../../../components/molecules/common/select/BorderSelect';
import LikeCategoryButton from './LikeCategoryButton';
import {
  RestaurantItemType,
  LocationType,
  FoodCategoryType,
  ReversedFoodCategoryType,
  ReversedLocationListType,
} from '../types/restaurant.type';
import RestaurantItem from './RestaurantItem';
import {
  locationList,
  foodCategoryList,
  reversedFoodCategoryList,
  reversedLocationList,
} from '../constants/restaurant';
import useRestaurantItem from '../hooks/useRestaurantItem';

export interface RestaurantListResponse {
  page: number;
  size: number;
  data: RestaurantItemType[];
}

const windowHeight = Dimensions.get('window').height;
const RestaurantListContainer = ({
  setBottomSheetItem,
  openBottomSheet,
}: {
  setBottomSheetItem: (item: RestaurantItemType) => void;
  openBottomSheet: () => void;
}) => {
  const [location, setLocation] = useState<LocationType>('TOTAL');
  const [foodCategory, setFoodCategory] = useState<FoodCategoryType>('TOTAL');
  const [isLike, setIsLike] = useState<boolean>(false);

  const setMappedFoodCatogory = (category: ReversedFoodCategoryType) => {
    setFoodCategory(reversedFoodCategoryList[category] as FoodCategoryType);
  };
  const setMappedLocation = (category: ReversedLocationListType) => {
    setLocation(reversedLocationList[category] as LocationType);
  };

  const {useRestaurantList} = useRestaurantItem();

  const {data, fetchNextPage, isError, isFetching, error, refetch} =
    useRestaurantList({
      isLike,
      location,
      foodCategory,
    });

  const items = useMemo(() => {
    return data?.pages.reduce(
      (accumulator, page) => accumulator.concat(page.data),
      [] as RestaurantItemType[],
    );
  }, [data?.pages]);

  const renderRestaurantList: ListRenderItem<any> = ({item}) => {
    return (
      <RestaurantItem
        key={item.id}
        item={item}
        setBottomSheetItem={setBottomSheetItem}
        openBottomSheet={openBottomSheet}
      />
    );
  };

  return (
    <View style={{gap: 12}}>
      <View style={{gap: 12}}>
        <Txt label="시립대 주변 맛집" color="grey190" typograph="titleLarge" />
      </View>
      <View style={{flexDirection: 'row', gap: 12, zIndex: 10}}>
        <BorderSelect
          options={Object.values(locationList)}
          currentOption={
            locationList[location] === 'TOTAL' ? '위치' : locationList[location]
          }
          setCurrent={setMappedLocation}
        />
        <BorderSelect
          options={Object.values(foodCategoryList)}
          currentOption={
            foodCategoryList[foodCategory] === 'TOTAL'
              ? '종류'
              : foodCategoryList[foodCategory]
          }
          setCurrent={setMappedFoodCatogory}
        />
        <LikeCategoryButton isLike={isLike} setIsLike={setIsLike} />
      </View>
      <View style={{gap: 12}}>
        {items ? (
          <FlatList
            style={{height: windowHeight - 500}}
            renderItem={renderRestaurantList}
            data={items}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{gap: 12, paddingBottom: 40}}
            onEndReached={() => fetchNextPage()}
          />
        ) : (
          <View
            style={{
              paddingHorizontal: 12,
              paddingVertical: 64,
              alignItems: 'center',
            }}>
            <Txt label="비어있어요" color="grey60" typograph="titleSmall" />
          </View>
        )}
      </View>
    </View>
  );
};
export default RestaurantListContainer;
