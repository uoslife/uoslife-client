import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Txt, Icon, colors} from '@uoslife/design-system';
import {View, StyleSheet, Linking, Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled, {css} from '@emotion/native';
import Header from '../../../components/molecules/common/header/Header';
import {RootNavigationProps} from '../../../navigators/types/rootStack';
import usePullToRefresh from '../../../hooks/usePullToRefresh';
import useModal from '../../../hooks/useModal';
import RankingContainer from './components/RangkingContainer';
import RestaurantListContainer from './components/RestaurantListContainer';
import GuidePopup from '../../../components/molecules/common/GuidePopup/GuidePopup';
import storage from '../../../storage';

export type RestaurantItemType = {
  name: string;
  location: string;
  restaurantType: string;
  like: boolean;
  likesCount: number;
  mapLink: string;
};

const RestaurantScreen = () => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<RootNavigationProps>();
  const [bottomSheetItem, setBottomSheetItem] =
    useState<RestaurantItemType | null>();
  const [openBottomSheet, closeBottomSheet, BottomSheet] =
    useModal('BOTTOM_SHEET');
  const [isGuidePopupOpen, setIsGuidePopupOpen] = useState(true);

  const handleClickBottomSheetButton = (item: RestaurantItemType) => {
    Linking.openURL(item.mapLink).catch(err =>
      console.error("Couldn't load page", err),
    );
  };
  const closeGuidePopup = () => {
    setIsGuidePopupOpen(false);
  };
  const renderGuidePopup = () => {
    if (storage.getBoolean('isRestaurantGuidePopupFirstOpen')) {
      storage.set('isRestaurantGuidePopupFirstOpen', false);
      return (
        <GuidePopup
          label="클릭 시 지도 앱으로 연결됩니다."
          tail="CENTER"
          onPress={closeGuidePopup}
          theme="PRIMARY"
          style={css`
            align-self: center;
            top: 433px;
            z-index: 1;
          `}
        />
      );
    }
    return null;
  };
  return (
    <View>
      {renderGuidePopup()}
      <Header
        style={{paddingTop: inset.top, marginBottom: 8}}
        label="맛집 리스트"
        onPressBackButton={() => navigation.goBack()}
      />
      <View
        style={{
          marginTop: 16,
          marginBottom: 16,
          marginLeft: 20,
          marginRight: 20,
          gap: 40,
        }}>
        <RankingContainer
          setBottomSheetItem={setBottomSheetItem}
          openBottomSheet={openBottomSheet}
        />
        <RestaurantListContainer
          setBottomSheetItem={setBottomSheetItem}
          openBottomSheet={openBottomSheet}
        />
      </View>
      <BottomSheet>
        <View style={{padding: 16, paddingBottom: inset.bottom}}>
          <S.bottomSheetTxtWrapper>
            <Txt
              label={bottomSheetItem ? bottomSheetItem?.name : ''}
              color="grey190"
              typograph="titleMedium"
            />
          </S.bottomSheetTxtWrapper>
          <View style={styles.lineStyle} />
          <S.BottomSheetButton
            onPress={() =>
              bottomSheetItem && handleClickBottomSheetButton(bottomSheetItem)
            }>
            <Txt label="카카오맵" color="grey190" typograph="bodyLarge" />
            <Icon name="arrow_down" height={30} width={30} color="grey190" />
          </S.BottomSheetButton>
          <S.BottomSheetButton
            onPress={() =>
              bottomSheetItem && handleClickBottomSheetButton(bottomSheetItem)
            }>
            <Txt label="네이버 지도" color="grey190" typograph="bodyLarge" />
            <Icon name="arrow_down" height={30} width={30} color="grey190" />
          </S.BottomSheetButton>
        </View>
      </BottomSheet>
    </View>
  );
};

const S = {
  BottomSheetButton: styled.Pressable`
    padding: 8px;
    height: 50px;
    justify-content: space-between;
    flex-direction: row;
  `,
  bottomSheetTxtWrapper: styled.Pressable`
    padding: 8px;
    height: 50px;
  `,
};
const styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 1,
    borderColor: colors.grey20,
    margin: 8,
  },
});
export default RestaurantScreen;
