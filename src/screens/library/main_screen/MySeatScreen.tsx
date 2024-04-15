import {useAtom} from 'jotai';
import styled from '@emotion/native';
import {Button} from '@uoslife/design-system';

import libraryReservationAtom from '../../../store/library';
import LibraryUserInfo from '../../../components/molecules/screens/library/LibraryUserInfo';

type Props = {redirectSeatList: () => void};

const MySeatScreen = ({redirectSeatList}: Props) => {
  const [{data}] = useAtom(libraryReservationAtom);
  return (
    <S.Container>
      <LibraryUserInfo />
      {data.reservationInfo ? (
        <S.ButtonWrapper>
          <Button label="좌석 연장하기" isFullWidth isRounded />
          <Button label="좌석 반납하기" isFullWidth isRounded />
        </S.ButtonWrapper>
      ) : (
        <S.ButtonWrapper>
          <Button
            label="좌석 발권하기"
            isFullWidth
            isRounded
            onPress={redirectSeatList}
          />
        </S.ButtonWrapper>
      )}
    </S.Container>
  );
};

export default MySeatScreen;

const S = {
  Container: styled.View`
    padding: 0 16px;
    gap: 24px;
  `,
  ButtonWrapper: styled.View`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,
};
