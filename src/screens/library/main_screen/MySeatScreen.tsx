import {useAtom} from 'jotai';
import styled from '@emotion/native';
import {Button, Txt, colors} from '@uoslife/design-system';

import libraryReservationAtom from '../../../store/library';
import LibraryUserInfo from '../../../components/molecules/screens/library/LibraryUserInfo';
import useModal from '../../../hooks/useModal';

type Props = {redirectSeatList: () => void};

const MySeatScreen = ({redirectSeatList}: Props) => {
  const [{data}] = useAtom(libraryReservationAtom);
  const [openExtendModal, closeExtendModal, ExtendModal] = useModal('MODAL');
  const [openReturnModal, closeReturnModal, ReturnModal] = useModal('MODAL');
  
  const handleOnPressExtend = () => {
    console.error('좌석 연장 api 연결하기');
  };
  const handleOnPressReturn = () => {
    console.error('좌석 반납 api 연결하기');
  };
  
  return (
    <>
      <S.Container>
        <LibraryUserInfo />
        {data.reservationInfo ? (
          <S.ButtonWrapper>
            <Button
              label="좌석 연장하기"
              isFullWidth
              isRounded
              onPress={openExtendModal}
            />
            <Button label="좌석 반납하기" isFullWidth isRounded onPress={openReturnModal}/>

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
      <ExtendModal>
        <S.ExtendModalWrapper>
          <Txt
            label="좌석을 연장하시겠습니까?"
            color="grey190"
            typograph="titleMedium"
            style={{padding: 16, paddingTop: 24, textAlign: 'center'}}
          />
          <S.Devider />
          <Button
            label="연장하기"
            size="medium"
            variant="text"
            isFullWidth
            onPress={handleOnPressExtend}
          />
          <S.Devider />
          <Button
            label="닫기"
            size="medium"
            variant="text"
            isFullWidth
            onPress={closeExtendModal}
          />
        </S.ExtendModalWrapper>
      </ExtendModal>
      <ReturnModal>
        <S.ReturnModalWrapper>
          <Txt
            label="좌석을 반납하시겠습니까?"
            color="grey190"
            typograph="titleMedium"
            style={{padding: 16, paddingTop: 24, textAlign: 'center'}}
          />
          <S.Devider />
          <Button
            label="반납하기"
            size="medium"
            variant="text"
            isFullWidth
            onPress={handleOnPressReturn}
          />
          <S.Devider />
          <Button
            label="닫기"
            size="medium"
            variant="text"
            isFullWidth
            onPress={closeReturnModal}
          />
        </S.ReturnModalWrapper>
      </ReturnModal>
    </>
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
  ExtendModalWrapper: styled.View``,
  ReturnModalWrapper: styled.View``,
  Devider: styled.View`
    width: 100%;
    height: 1px;
    background-color: ${colors.grey40};
  `,
};
