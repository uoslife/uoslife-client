import styled from '@emotion/native';
import {Txt, colors} from '@uoslife/design-system';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';

import {LibrarySeatListScreenProps} from '../../../navigators/types/library';
import Header from '../../../components/molecules/common/header/Header';
import {
  RoomNameEnum,
  RoomNameType,
} from '../../../configs/utility/librarySeatingChart/roomName';
import {
  SeatStatusColorEnum,
  SeatStatusEnum,
} from '../../../configs/utility/librarySeatingChart/seatStatus';
import LibrarySeatingChart from '../../../components/molecules/screens/library/LibrarySeatingChart';

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

  return (
    <>
      <Header
        label={RoomNameEnum[roomNumber as RoomNameType]}
        onPressBackButton={handleGoBack}
        style={{paddingTop: insets.top}}
      />
      <S.StatusInfo>
        <S.StatusItemWrapper>
          <S.StatusColorBox
            style={{backgroundColor: SeatStatusColorEnum.AVAILABLE}}
          />
          <Txt
            label={SeatStatusEnum.AVAILABLE}
            color="grey190"
            typograph="labelMedium"
          />
        </S.StatusItemWrapper>
        <S.StatusItemWrapper>
          <S.StatusColorBox
            style={{backgroundColor: SeatStatusColorEnum.RESERVED}}
          />
          <Txt
            label={SeatStatusEnum.RESERVED}
            color="grey190"
            typograph="labelMedium"
          />
        </S.StatusItemWrapper>
        <S.StatusItemWrapper>
          <S.StatusColorBox
            style={{backgroundColor: SeatStatusColorEnum.SPECIFIED}}
          />
          <Txt
            label={SeatStatusEnum.SPECIFIED}
            color="grey190"
            typograph="labelMedium"
          />
        </S.StatusItemWrapper>
        <S.StatusItemWrapper>
          <S.StatusColorBox
            style={{backgroundColor: SeatStatusColorEnum.NOT_AVAILABLE}}
          />
          <Txt
            label={SeatStatusEnum.NOT_AVAILABLE}
            color="grey190"
            typograph="labelMedium"
          />
        </S.StatusItemWrapper>
      </S.StatusInfo>
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
          <LibrarySeatingChart roomNumber={roomNumber as RoomNameType} />
        </S.Container>
      </ReactNativeZoomableView>
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

  StatusInfo: styled.View`
    padding: 14px 10px;
    width: 100%;
    gap: 14px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `,
  StatusItemWrapper: styled.View`
    flex-direction: row;
    gap: 4px;
  `,
  StatusColorBox: styled.View`
    width: 18px;
    height: 18px;
    border-radius: 6px;
  `,
};
