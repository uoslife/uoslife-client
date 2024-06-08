import {View, FlatList, ListRenderItem, Dimensions} from 'react-native';
import {useState} from 'react';
import {Txt} from '@uoslife/design-system';
import BorderSelect from '../../../../components/molecules/common/select/BorderSelect';
import LikeCategoryButton from './LikeCategoryButton';
import {RestaurantItemType} from '../RestaurantScreen';
import RestaurantItem from './RestaurantItem';
import {data} from '../dummy';
import {locationList, foodCategoryList} from '../constants/restaurant';
import {LocationType, FoodCategoryType} from '../types/restaurant.type';

const windowHeight = Dimensions.get('window').height;
const RestaurantListContainer = ({
  setBottomSheetItem,
  openBottomSheet,
}: {
  setBottomSheetItem: (item: RestaurantItemType) => void;
  openBottomSheet: () => void;
}) => {
  const [location, setLocation] = useState<LocationType>('전체');
  const [foodCategory, setFoodCategory] = useState<FoodCategoryType>('전체');
  const [restaurantList, setRestaurantList] = useState(data);
  const [isLike, setIsLike] = useState<boolean>(false);

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
