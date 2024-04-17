import {useAtom} from 'jotai';
import styled from '@emotion/native';
import {Button, Txt, colors, Icon} from '@uoslife/design-system';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';

import libraryReservationAtom from '../../../store/library';
import LibraryUserInfo from '../../../components/molecules/screens/library/LibraryUserInfo';
import useModal from '../../../hooks/useModal';
import GuidePopup from '../../../components/molecules/common/GuidePopup';

type Props = {redirectSeatList: () => void};

const MySeatScreen = ({redirectSeatList}: Props) => {
  const [{data}] = useAtom(libraryReservationAtom);
  const [openExtendModal, closeExtendModal, ExtendModal] = useModal('MODAL');
  const [openReturnModal, closeReturnModal, ReturnModal] = useModal('MODAL');
  const [isGuidePopupOpen, setIsGuidePopupOpen] = useState(false);

  const handleOnPressExtend = () => {
    console.error('좌석 연장 api 연결하기');
  };
  const handleOnPressReturn = () => {
    console.error('좌석 반납 api 연결하기');
  };
  const closeGuidePopup = () => {
    setIsGuidePopupOpen(false);
  };
  return (
    <>
      <S.Container>
        <LibraryUserInfo />
        <S.InformationWrapper>
          {isGuidePopupOpen && (
            <GuidePopup
              label="포털 계정 연동하면 좌석을 발권할 수 있어요!"
              tail="RIGHT"
              onPress={closeGuidePopup}></GuidePopup>
          )}
          <S.IconWrapper onPress={() => setIsGuidePopupOpen(true)}>
            <Icon color={'grey190'} name={'clear'} width={24} height={24} />
          </S.IconWrapper>
        </S.InformationWrapper>
        {data.reservationInfo ? (
          <S.ButtonWrapper>
            <Button
              label="좌석 연장하기"
              isFullWidth
              isRounded
              onPress={openExtendModal}
            />
            <Button
              label="좌석 반납하기"
              isFullWidth
              isRounded
              onPress={openReturnModal}
            />
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
    gap: 12px;
    margin-top: 12px;
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
  InformationWrapper: styled.View`
    align-items: flex-end;
    right: 20px;
  `,
  IconWrapper: styled(TouchableOpacity)`
    width: 40px;
    height: 40px;
    background: ${colors.secondaryBrand};
    border-radius: 100px;
    justify-content: center;
    align-items: center;
  `,
};
