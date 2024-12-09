import {View, Pressable} from 'react-native';
import styled from '@emotion/native';
import {Txt, Icon, colors} from '@uoslife/design-system';
import {UseMutationResult} from '@tanstack/react-query';
import {
  RestaurantClickResponse,
  RestaurantItemType,
} from '../types/restaurant.type';
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
  likeMutation,
}: {
  item: RestaurantItemType;
  setBottomSheetItem: (item: RestaurantItemType) => void;
  openBottomSheet: () => void;
  likeMutation: UseMutationResult<
    RestaurantClickResponse,
    unknown,
    RestaurantItemType,
    unknown
  >;
}) => {
  const {handleClickItem} = useRestaurantItem();

  const handleClickRestaurantItem = () => {
    setBottomSheetItem(item);
    openBottomSheet();
    handleClickItem.mutate(item);
  };

  return (
    <S.RestaurantItemContainer onPress={() => handleClickRestaurantItem()}>
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
      <Pressable onPress={() => likeMutation.mutate(item)}>
        <Icon
          color={item.isLike ? 'primaryBrand' : 'grey90'}
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
