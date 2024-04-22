import React, {useMemo} from 'react';
import {useAtom} from 'jotai';
import {View} from 'react-native';
import styled from '@emotion/native';
import {Button, Icon, Txt, colors} from '@uoslife/design-system';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';

import {useMutation, useQuery} from '@tanstack/react-query';
import {LibrarySeatListScreenProps} from '../../../navigators/types/library';
import Header from '../../../components/molecules/common/header/Header';
import {
  RoomNameEnum,
  RoomNameType,
} from '../../../configs/utility/librarySeatingChart/roomName';
import LibrarySeatingChart from '../../../components/molecules/screens/library/LibrarySeatingChart';
import useModal from '../../../hooks/useModal';
import LibraryStatusInfoBox from '../../../components/molecules/screens/library/LibraryStatusInfoBox';
import {
  initSelectedSeatAtom,
  selectedSeatAtom,
} from '../../../store/library/reservation';
import AnimatePress from '../../../components/animations/pressable_icon/AnimatePress';
import {UtilAPI} from '../../../api/services';
import {ReservationSeatParams} from '../../../api/services/util/library/libraryAPI.type';
import showLibraryErrorCode from '../../../utils/library/showLibraryErrorCode';
import {ErrorResponseType} from '../../../api/services/type';

const LibrarySeatingChartScreen = ({
  route: {
    params: {roomNumber},
  },
}: LibrarySeatListScreenProps) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const handleGoBack = () => {
    navigation.goBack();
  };

  const roomName = useMemo(
    () => RoomNameEnum[roomNumber as RoomNameType],
    [roomNumber],
  );

  // reservation
  const [openBottomSheet, closeBottomSheet, BottomSheet] =
    useModal('BOTTOM_SHEET');
  const [selectedSeat, setSelectedSeat] = useAtom(selectedSeatAtom);
  const handlePressItem = () => {
    openBottomSheet();
  };

  const {data: seatList, refetch} = useQuery({
    queryKey: ['getSeatList', roomNumber],
    queryFn: () => UtilAPI.getSeatList({room: parseInt(roomNumber)}),
  });

  const reservationSeatMutation = useMutation({
    mutationKey: ['reservationSeat'],
    mutationFn: (params: ReservationSeatParams) =>
      UtilAPI.reservationSeat(params),
    onError: (error: ErrorResponseType) => {
      console.log(error);
      showLibraryErrorCode(error.code, 'reservation');
    },
    onSuccess: () => {
      // @ts-ignore
      navigation.replace('Library', {params: {status: 'MY_SEAT'}});
      // navigation.navigate({
      //   key: navigation.getParent()?.getState().routes[0].key ?? '',
      //   params: {status: 'MY_SEAT'},
      // });
      setSelectedSeat(initSelectedSeatAtom);
    },
  });
  const handlePressReservation = () => {
    const {seatId} = selectedSeat;
    const roomId = parseInt(roomNumber);
    if (!seatId) return;

    reservationSeatMutation.mutate({
      roomId,
      seatId,
    });
  };
  return (
    <>
      <Header
        label={roomName}
        onPressBackButton={handleGoBack}
        style={{
          paddingTop: insets.top,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <AnimatePress variant="scale_up_2" onPress={() => refetch()}>
          <Icon name="refresh" width={24} height={24} color="grey160" />
        </AnimatePress>
      </Header>
      <LibraryStatusInfoBox />
      <ReactNativeZoomableView
        maxZoom={4}
        minZoom={1}
        zoomStep={2}
        initialZoom={1}
        bindToBorders
        style={{
          backgroundColor: colors.primaryLighterAlt,
          marginBottom: insets.bottom,
        }}>
        <S.Container>
          <LibrarySeatingChart
            roomNumber={roomNumber as RoomNameType}
            handlePressItem={handlePressItem}
            seatList={seatList}
          />
        </S.Container>
      </ReactNativeZoomableView>
      <BottomSheet>
        <S.SheetContainer style={{paddingBottom: insets.bottom + 8}}>
          <View style={{gap: 6}}>
            <View>
              <Txt
                label={`중앙도서관 ${roomName}의 ${
                  selectedSeat.seatId ?? ''
                }번 좌석을`}
                color="grey190"
                typograph="titleLarge"
              />
              <Txt
                label="발권하시겠습니까?"
                color="grey190"
                typograph="titleLarge"
              />
            </View>
            {selectedSeat.forDisabledPerson && (
              <Txt
                label="* 선택하신 좌석은 장애인석 입니다."
                color="red"
                typograph="titleSmall"
              />
            )}
            {selectedSeat.forDesktopSeat && (
              <Txt
                label="* 선택하신 좌석은 PC좌석입니다."
                color="red"
                typograph="titleSmall"
              />
            )}
          </View>
          <View style={{gap: 8}}>
            <Button
              label="발권하기"
              isFullWidth
              onPress={handlePressReservation}
            />
            <Button
              label="취소"
              variant="outline"
              isFullWidth
              onPress={closeBottomSheet}
            />
          </View>
        </S.SheetContainer>
      </BottomSheet>
    </>
  );
};

export default LibrarySeatingChartScreen;

const S = {
  Container: styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
  `,
  SheetContainer: styled.View`
    width: 100%;
    margin: 0 auto;
    padding: 24px 20px;
    gap: 40px;
  `,
};
