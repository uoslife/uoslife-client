import {useEffect} from 'react';
import {useAtom} from 'jotai';
import {useNavigation} from '@react-navigation/native';
import styled from '@emotion/native';
import {Button, Icon, Txt, colors} from '@uoslife/design-system';
import CardLayout from '../../../common/cardLayout/CardLayout';

import UtilityService from '../../../../../services/utility';
import {LibraryReservationType} from '../../../../../api/services/util/library/libraryAPI.type';
import {RootNavigationProps} from '../../../../../navigators/RootStackNavigator';
import libraryReservationAtom from '../../../../../store/library';

const LibraryContentsInUsing = ({
  seatRoomName,
  seatNo,
}: Pick<LibraryReservationType, 'seatRoomName' | 'seatNo'>) => {
  return (
    <S.Wrapper>
      <S.LeftArea>
        <S.TimerBackground>
          <Icon name="time" width={24} height={24} color="primaryBrand" />
        </S.TimerBackground>
        <Txt label="이용 중" color="primaryBrand" typograph="bodySmall" />
      </S.LeftArea>
      <S.RightArea>
        <Txt label={`${seatRoomName}`} color="grey190" typograph="bodyLarge" />
        <S.SeatText>
          <Txt label={`${seatNo}번`} color="grey190" typograph="titleMedium" />
          <Txt label="좌석" color="grey190" typograph="bodyLarge" />
        </S.SeatText>
      </S.RightArea>
    </S.Wrapper>
  );
};

const LibraryContentsInNotUsing = () => {
  const navigation = useNavigation<RootNavigationProps>();
  return (
    <S.NotUsingWrapper>
      <S.NotUsingTextWrapper>
        <Txt
          label="이용 중인 좌석이 없어요"
          color="grey150"
          typograph="bodyLarge"
          style={{textAlign: 'center'}}
        />
      </S.NotUsingTextWrapper>
      <S.Divider />
      <Button
        label="좌석 현황 보기"
        variant="text"
        size="medium"
        isFullWidth
        onPress={() => {
          navigation.navigate('Library');
        }}
      />
    </S.NotUsingWrapper>
  );
};

const LibraryContents = () => {
  const [{data}] = useAtom(libraryReservationAtom);

  return (
    <CardLayout>
      {data.reservationInfo ? (
        <LibraryContentsInUsing
          seatRoomName={data.reservationInfo.seatRoomName}
          seatNo={data.reservationInfo.seatNo}
        />
      ) : (
        <LibraryContentsInNotUsing />
      )}
    </CardLayout>
  );
};

export default LibraryContents;

const S = {
  Wrapper: styled.Pressable`
    padding: 20px 16px;
    display: flex;
    flex-direction: row;
    gap: 16px;
  `,
  LeftArea: styled.View`
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    justify-content: center;
  `,
  TimerBackground: styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 24px;
    background-color: ${colors.primaryLighterAlt};
  `,
  SeatText: styled.View`
    display: flex;
    flex-direction: row;
    gap: 4px;
  `,
  RightArea: styled.View`
    display: flex;
    flex-direction: column;
    gap: 4px;
    justify-content: center;
  `,
  NotUsingWrapper: styled.View`
    padding: 8px 26px;
    gap: 4px;
  `,
  NotUsingTextWrapper: styled.View`
    padding: 20px 16px;
  `,
  Divider: styled.View`
    width: 100%;
    height: 1px;
    background-color: ${colors.grey40};
  `,
};
