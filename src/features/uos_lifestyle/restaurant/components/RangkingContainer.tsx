import {useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Txt, Icon, colors} from '@uoslife/design-system';
import styled, {css} from '@emotion/native';
import {RestaurantItemType} from '../RestaurantScreen';
import {reduceTitle} from './RestaurantItem';
import {restaurantListTop} from '../dummy';
import GuidePopup from '../../../../components/molecules/common/GuidePopup/GuidePopup';
import useRestaurantItem from '../hooks/useRestaurantItem';
import usePullToRefresh from '../../../../hooks/usePullToRefresh';

const RankingContainer = ({
  setBottomSheetItem,
  openBottomSheet,
}: {
  setBottomSheetItem: (item: RestaurantItemType) => void;
  openBottomSheet: () => void;
}) => {
  const [isGuidePopupOpen, setIsGuidePopupOpen] = useState(false);
  const handleClickRestaurantItem = (item: RestaurantItemType) => {
    setBottomSheetItem(item);
    openBottomSheet();
  };
  const closeGuidePopup = () => {
    setIsGuidePopupOpen(false);
  };
  const handleClickInfoIcon = () => {
    setIsGuidePopupOpen(!isGuidePopupOpen);
  };
  // const {getTopRestaurantItem} = useRestaurantItem();
  // const {data} = getTopRestaurantItem;

  // console.log(data);
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
          {isGuidePopupOpen && (
            <GuidePopup
              label="클릭 수를 기준으로 집계됩니다."
              tail="RIGHT"
              onPress={closeGuidePopup}
              theme="PRIMARY"
              style={css`
                position: absolute;
                right: -3px;
                bottom: 20px;
              `}
            />
          )}
          <Pressable
            style={{
              paddingRight: 12,
              justifyContent: 'center',
            }}
            onPress={handleClickInfoIcon}>
            <Icon color="primaryBrand" name="info" width={18} height={18} />
          </Pressable>
        </View>
        <View>
          {restaurantListTop.map((item, idx) => {
            return (
              <>
                <S.RankingItem onPress={() => handleClickRestaurantItem(item)}>
                  <View style={{flexDirection: 'row', gap: 16}}>
                    <Txt
                      label={String(idx + 1)}
                      color="grey90"
                      typograph="titleMedium"
                    />
                    <Txt
                      label={reduceTitle(item.name)}
                      color="grey190"
                      typograph="titleMedium"
                    />
                  </View>
                  <View style={{flexDirection: 'row', gap: 4}}>
                    <S.IconWrapper>
                      <Icon
                        color="primaryBrand"
                        name="heart"
                        width={20}
                        height={20}
                      />
                    </S.IconWrapper>
                    <Txt
                      label={String(item.likesCount)}
                      color="primaryBrand"
                      typograph="titleMedium"
                    />
                  </View>
                </S.RankingItem>
                {idx !== restaurantListTop.length - 1 && (
                  <View style={styles.lineStyle} />
                )}
              </>
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
    padding: 12px;
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
