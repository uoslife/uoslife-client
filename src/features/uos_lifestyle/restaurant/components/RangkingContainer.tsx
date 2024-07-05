import {View, StyleSheet} from 'react-native';
import {Txt, Icon, colors} from '@uoslife/design-system';
import styled from '@emotion/native';
import {RestaurantItemType} from '../types/restaurant.type';
import {reduceTitle} from './RestaurantItem';
import useRestaurantItem from '../hooks/useRestaurantItem';

const RankingContainer = ({
  setBottomSheetItem,
  openBottomSheet,
}: {
  setBottomSheetItem: (item: RestaurantItemType) => void;
  openBottomSheet: () => void;
}) => {
  const handleClickRestaurantItem = (item: RestaurantItemType) => {
    setBottomSheetItem(item);
    openBottomSheet();
    handleClickItem.mutate(item);
  };

  const {getTopRestaurantItem, handleClickItem} = useRestaurantItem();
  const {data} = getTopRestaurantItem;

  return (
    <View>
      <View style={{gap: 12}}>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            justifyContent: 'space-between',
          }}>
          <Txt
            label="시대인이 선정한 실시간 맛집 랭킹"
            color="grey190"
            typograph="titleLarge"
          />
        </View>
        <View>
          {data?.restaurants.map((item, idx) => {
            return (
              <View key={item.id}>
                <S.RankingItem onPress={() => handleClickRestaurantItem(item)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 16,
                    }}>
                    <View style={{justifyContent: 'center'}}>
                      <Txt
                        label={String(idx + 1)}
                        color="grey90"
                        typograph="titleMedium"
                      />
                    </View>
                    <View style={{gap: 3}}>
                      <Txt
                        label={reduceTitle(item.name)}
                        color="grey190"
                        typograph="titleMedium"
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 8,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 2,
                          }}>
                          <S.IconWrapper>
                            <Icon
                              color="grey90"
                              name="person"
                              width={13}
                              height={13}
                            />
                          </S.IconWrapper>
                          <Txt
                            label={reduceTitle(String(item.clickCount))}
                            color="primaryBrand"
                            typograph="labelSmall"
                          />
                        </View>
                        <View style={{flexDirection: 'row', gap: 2}}>
                          <S.IconWrapper>
                            <Icon
                              color="grey90"
                              name="heart"
                              width={13}
                              height={13}
                            />
                          </S.IconWrapper>
                          <Txt
                            label={reduceTitle(String(item.likeCount))}
                            color="primaryBrand"
                            typograph="labelSmall"
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 4,
                      justifyContent: 'center',
                    }}>
                    <S.IconWrapper>
                      <Icon
                        color="grey130"
                        name="forwardArrow"
                        width={25}
                        height={25}
                      />
                    </S.IconWrapper>
                  </View>
                </S.RankingItem>
                {idx !== data.restaurants.length - 1 && (
                  <View style={styles.lineStyle} />
                )}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};
const S = {
  RankingItem: styled.Pressable`
    justify-content: space-between;
    padding: 8px;
    flex-direction: row;
  `,
  IconWrapper: styled.View`
    justify-content: center;
    align-items: center;
  `,
};
const styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 1,
    borderColor: colors.grey20,
    margin: 8,
  },
});
export default RankingContainer;
