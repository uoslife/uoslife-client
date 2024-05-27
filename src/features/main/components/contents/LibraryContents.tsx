import {useAtom} from 'jotai';
import {useIsFocused} from '@react-navigation/native';
import styled from '@emotion/native';
import {Icon, Txt, colors} from '@uoslife/design-system';
import {useEffect} from 'react';
import {LibraryReservationType} from '../../../../api/services/util/library/libraryAPI.type';
import CardLayout from '../../../../components/molecules/common/cardLayout/CardLayout';
import {libraryReservationAtom} from '../../../library/store';

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
    </S.NotUsingWrapper>
  );
};

const LibraryContents = () => {
  const [{data, refetch}] = useAtom(libraryReservationAtom);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) refetch();
  }, [isFocused, refetch]);
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
};
