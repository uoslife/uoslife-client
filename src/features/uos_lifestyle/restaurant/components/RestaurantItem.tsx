import {View, Pressable} from 'react-native';
import styled from '@emotion/native';
import {Txt, Icon, colors} from '@uoslife/design-system';
import {RestaurantItemType} from '../RestaurantScreen';
import {locationList, foodCategoryList} from '../constants/restaurant';
import useRestaurantItem from '../hooks/useRestaurantItem';

export const reduceTitle = (title: string) => {
  if (title.length >= 15) {
    return `${title.substring(0, 15)}...`;
  }
  return title;
};

const RestaurantItem = ({
  item,
  setBottomSheetItem,
  openBottomSheet,
}: {
  item: RestaurantItemType;
  setBottomSheetItem: (item: RestaurantItemType) => void;
  openBottomSheet: () => void;
}) => {
  const handleClickRestaurantItem = (item: RestaurantItemType) => {
    setBottomSheetItem(item);
    openBottomSheet();
  };
  const {handleClickLikeButton} = useRestaurantItem();
  // const handleClickLikeButton = (item: RestaurantItemType) => {
  //   // api 완성 후 좋아요 버튼 - 임시
  //   // const newList = restaurantList.map(restaurant => {
  //   //   if (restaurant.name === item.name) {
  //   //     if (restaurant.like) {
  //   //       return {
  //   //         ...restaurant,
  //   //         like: !restaurant.like,
  //   //         likeCount: restaurant.likeCount - 1,
  //   //       };
  //   //     }
  //   //     return {
  //   //       ...restaurant,
  //   //       like: !restaurant.like,
  //   //       likeCount: restaurant.likeCount + 1,
  //   //     };
  //   //   }
  //   //   return restaurant;
  //   // });
  //   // setRestaurantList(newList);
  // };

  return (
    <S.RestaurantItemContainer onPress={() => handleClickRestaurantItem(item)}>
      <View style={{gap: 6}}>
        <Txt
          label={reduceTitle(item.name)}
          color="grey190"
          typograph="titleMedium"
        />
        <View style={{flexDirection: 'row', gap: 6}}>
          <S.CategoryBox type="color">
            <Txt
              label={locationList[item.location]}
              color="primaryBrand"
              typograph="titleSmall"
            />
          </S.CategoryBox>
          <S.CategoryBox>
            <Txt
              label={foodCategoryList[item.restaurantType]}
              color="grey130"
              typograph="titleSmall"
            />
          </S.CategoryBox>
        </View>
      </View>
      <Pressable onPress={() => handleClickLikeButton(item.id)}>
        <Icon
          color={item.like ? 'primaryBrand' : 'grey90'}
          name="heart"
          width={28}
          height={28}
        />
      </Pressable>
    </S.RestaurantItemContainer>
  );
};
export default RestaurantItem;
type CategoryBoxType = {
  type?: 'color';
};
const S = {
  RestaurantItemContainer: styled.Pressable`
    padding: 12px 16px 12px 20px;
    background-color: white;
    flex-direction: row;
    border-radius: 20px;
    border: 1px solid ${colors.grey40};
    justify-content: space-between;
    gap: 4px;
    align-items: center;
  `,
  CategoryBox: styled.View<CategoryBoxType>`
    padding: 2px 8px;
    border-radius: 20px;
    background-color: ${colors.grey20};
    ${props => props.type && `background-color: ${colors.primaryLighterAlt}`};
    align-self: center;
  `,
};
