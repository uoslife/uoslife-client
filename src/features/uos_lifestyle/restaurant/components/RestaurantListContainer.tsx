import {View, FlatList, ListRenderItem, Dimensions} from 'react-native';
import {useState} from 'react';
import {Txt} from '@uoslife/design-system';
import BorderSelect from '../../../../components/molecules/common/select/BorderSelect';
import LikeCategoryButton from './LikeCategoryButton';
import {RestaurantItemType} from '../RestaurantScreen';
import RestaurantItem from './RestaurantItem';
const windowHeight = Dimensions.get('window').height;
type LocationType = '전체' | '정문' | '후문';
type FoodCategoryType =
  | '전체'
  | '한식'
  | '일식'
  | '중식'
  | '양식'
  | '분식'
  | '간편식'
  | '기타';
const RestaurantListContainer = ({
  isLike,
  setIsLike,
  setBottomSheetItem,
  openBottomSheet,
  restaurantList,
  setRestaurantList,
}: {
  isLike: boolean;
  setIsLike: (isLike: boolean) => void;
  setBottomSheetItem: (item: RestaurantItemType) => void;
  openBottomSheet: () => void;
  restaurantList: RestaurantItemType[];
  setRestaurantList: (restaurantList: RestaurantItemType[]) => void;
}) => {
  const [location, setLocation] = useState<LocationType>('전체');
  const [foodCategory, setFoodCategory] = useState<FoodCategoryType>('전체');
  const locationList = ['전체', '정문', '후문'];
  const foodCategoryList = [
    '전체',
    '한식',
    '일식',
    '중식',
    '양식',
    '분식',
    '간편식',
    '기타',
  ];

  const filteredRestaurantList = (data: RestaurantItemType[]) => {
    let filteredData = data;
    if (location !== '전체') {
      filteredData = filteredData.filter(item => item.location === location);
    }
    if (foodCategory !== '전체') {
      filteredData = filteredData.filter(
        item => item.restaurantType === foodCategory,
      );
    }
    if (isLike) {
      filteredData = filteredData.filter(item => item.like);
    }
    return filteredData;
  };
  const renderRestaurantList: ListRenderItem<any> = ({
    item,
  }: {
    item: RestaurantItemType;
  }) => {
    return (
      <RestaurantItem
        item={item}
        setBottomSheetItem={setBottomSheetItem}
        openBottomSheet={openBottomSheet}
        restaurantList={restaurantList}
        setRestaurantList={setRestaurantList}
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
          options={locationList}
          currentOption={location === '전체' ? '위치' : location}
          setCurrent={setLocation}
        />
        <BorderSelect
          options={foodCategoryList}
          currentOption={foodCategory === '전체' ? '종류' : foodCategory}
          setCurrent={setFoodCategory}
        />
        <LikeCategoryButton isLike={isLike} setIsLike={setIsLike} />
      </View>
      <View style={{gap: 12}}>
        <FlatList
          style={{gap: 12, height: windowHeight - 500}}
          renderItem={renderRestaurantList}
          data={filteredRestaurantList(restaurantList)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{gap: 12}}
        />
      </View>
    </View>
  );
};
export default RestaurantListContainer;
