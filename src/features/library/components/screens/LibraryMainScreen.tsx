import {useEffect, useMemo, useState} from 'react';
import {useAtom, useSetAtom} from 'jotai';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import {Text, View} from 'react-native';
import {Button, colors} from '@uoslife/design-system';
import styled from '@emotion/native';
import Header from '../../../../components/molecules/common/header/Header';
import {isFocusedLibraryAtom, libraryReservationAtom} from '../../store';
import {LibraryMainScreenProps} from '../../navigators/types/library';
import TabView from '../../../../components/molecules/common/tab_view/TabView';
import {LibraryTabsEnum, LibraryTabsType} from '../../constants/libraryTabs';
import MySeatScreen from './main_screen/MySeatScreen';
import RecordScreen from './main_screen/RecordScreen';
import SeatListScreen from './main_screen/SeatListScreen';

import useLibraryExtend from '../../hooks/queries/useLibraryExtend';
import useLibraryReturn from '../../hooks/queries/useLibraryReturn';

const LibraryMainScreen = ({route: {params}}: LibraryMainScreenProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const setIsFocusedLibraryScreen = useSetAtom(isFocusedLibraryAtom);
  const findIndexByStatus = (status: LibraryTabsType) =>
    Object.keys(LibraryTabsEnum).findIndex(i => i.match(status));

  const initialStatus = useMemo(
    () => (params?.status ?? 'MY_SEAT') satisfies LibraryTabsType,
    [params?.status],
  );
  const initialIndex = useMemo(
    () => findIndexByStatus(initialStatus),
    [initialStatus],
  );
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    if (!params || !params.status) return;
    const i = findIndexByStatus(params.status);
    setIndex(i);
  }, [params, params?.status]);

  const handleGoBack = () => {
    navigation.goBack();
  };
  const [{refetch}] = useAtom(libraryReservationAtom);
  // '이용 중인 좌석' API의 auto refetch를 위해 도서관 화면의 isFocused 상태를 저장합니다.
  useEffect(() => {
    const isFocusedMySeatScreen = isFocused && index === 0;
    if (isFocusedMySeatScreen) refetch(); // 최초 진입시 한번 fetch 해오도록 구현
    setIsFocusedLibraryScreen(isFocusedMySeatScreen);
  }, [index, isFocused, refetch, setIsFocusedLibraryScreen]);

  const {
    openExtendSheet,
    closeExtendSheet,
    ExtendBottomSheet,
    handleOnPressExtend,
  } = useLibraryExtend();
  const {
    openReturnSheet,
    closeReturnSheet,
    ReturnBottomSheet,
    handleOnPressReturn,
  } = useLibraryReturn();

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <Header
        label="도서관"
        onPressBackButton={handleGoBack}
        style={{paddingTop: insets.top}}
      />
      <TabView index={index} setIndex={setIndex}>
        <TabView.Screen
          tabKey="MY_SEAT"
          tabTitle={LibraryTabsEnum.MY_SEAT}
          component={
            <MySeatScreen
              redirectSeatList={() => setIndex(1)}
              openExtendSheet={openExtendSheet}
              openReturnSheet={openReturnSheet}
            />
          }
        />
        <TabView.Screen
          tabKey="SEAT_LIST"
          tabTitle={LibraryTabsEnum.SEAT_LIST}
          component={<SeatListScreen />}
        />
        <TabView.Screen
          tabKey="RECORD"
          tabTitle={LibraryTabsEnum.RECORD}
          component={<RecordScreen />}
        />
      </TabView>
      <ExtendBottomSheet>
        <S.SheetContainer style={{paddingBottom: insets.bottom + 8}}>
          <Text
            style={{
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 21,
              paddingLeft: 8,
              color: colors.grey190,
            }}>
            좌석을 연장할까요?
          </Text>
          <View style={{gap: 8}}>
            <Button
              label="연장하기"
              isFullWidth
              onPress={handleOnPressExtend}
              isRounded
            />
            <Button
              label="취소"
              variant="outline"
              isFullWidth
              onPress={closeExtendSheet}
              isRounded
            />
          </View>
        </S.SheetContainer>
      </ExtendBottomSheet>
      <ReturnBottomSheet>
        <S.SheetContainer style={{paddingBottom: insets.bottom + 8}}>
          <Text
            style={{
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 21,
              paddingLeft: 8,
              color: colors.grey190,
            }}>
            좌석을 반납할까요?
          </Text>
          <View style={{gap: 8}}>
            <Button
              label="반납하기"
              isFullWidth
              onPress={handleOnPressReturn}
              isRounded
            />
            <Button
              label="취소"
              variant="outline"
              isFullWidth
              onPress={closeReturnSheet}
              isRounded
            />
          </View>
        </S.SheetContainer>
      </ReturnBottomSheet>
    </View>
  );
};

export default LibraryMainScreen;

const S = {
  SheetContainer: styled.View`
    width: 100%;
    margin: 0 auto;
    padding: 26px 20px;
    gap: 42px;
  `,
};
