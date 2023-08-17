import styled from '@emotion/native';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Button} from '../../../components/button/Button';

import AgreementToTerms from '../../../components/contents/AgreementToTerms';
import AgreementProcessResult from '../../../components/contents/AgreementProcessResult';

import useModal from '../../../hooks/useModal';
import useBottomSheet from '../../../hooks/useBottomSheet';

interface SecondPageProps {
  setPage: Dispatch<SetStateAction<number>>;
}

interface InputProps {
  text: string;
  isChecked: boolean;
}

const SecondPage = ({setPage}: SecondPageProps) => {
  const [input, setInput] = useState<InputProps>({
    text: '',
    isChecked: false,
  });
  const {
    renderBottomSheet,
    setBottomSheetContent,
    openBottomSheet,
    activateBottomSheetBgDark,
    deactivateBottomSheetBgDark,
  } = useBottomSheet();
  const {renderModal, setModalContent, openModal, closeModal} = useModal();

  // Modal, BottomSheet의 content요소들 preset
  useEffect(() => {
    // BottomSheet에서 광고성 정보 수신 동의 시 실행됨
    const handlePromotionTermChecked = () => {
      // 모달 띄우고, 바텀시트의 까만배경 비활성화
      openModal();
      deactivateBottomSheetBgDark();
    };

    setBottomSheetContent(
      <AgreementToTerms
        handlePromotionTermChecked={handlePromotionTermChecked}
      />,
    );

    // 모달 닫을 시 실행됨
    const modalCloseHandler = () => {
      // 모달 닫고, 바텀시트의 까만배경 활성화
      closeModal();
      activateBottomSheetBgDark();
    };

    setModalContent(
      <>
        <AgreementProcessResult />
        <S.modalCloseButton onPress={modalCloseHandler}>
          닫기
        </S.modalCloseButton>
      </>,
    );
  }, []);

  const handlePressConfirm = () => {
    openBottomSheet();
  };

  const onChangeNickname = (text: string) => {
    const regex = /^[가-힣a-zA-Z0-9!@#$%^&*()-_+=~]{1,8}$/;

    const isValid = regex.test(text); // 정규표현식 일치 여부 확인
    let isVerified = false; // 중복되지 않았는지 확인: API 붙인 뒤 로직 작성

    try {
      isVerified = true;
    } catch (err) {
      console.log(err);
    }

    const isChecked = isValid && isVerified;

    setInput({text, isChecked});
  };

  return (
    <>
      <S.pageWrapper>
        <S.contentsContainer>
          <S.description1>사용하실 닉네임을 입력해주세요.</S.description1>
          <View>
            <S.description2>
              닉네임은 최대 8자로 설정 가능합니다.
            </S.description2>
            <S.description2>
              한글, 영문, 숫자, 특수기호를 이용해주세요.
            </S.description2>
          </View>
          <View>
            <View>
              <S.literalNickname>닉네임</S.literalNickname>
            </View>
            <S.nicknameAndCheck>
              <TextInput
                value={input.text}
                onChangeText={onChangeNickname}
                style={{
                  borderColor: 'black',
                  borderStyle: 'solid',
                  borderWidth: 5,
                  flex: 1,
                }}
              />
            </S.nicknameAndCheck>
          </View>
        </S.contentsContainer>
        <Button
          label={'확인'}
          onPress={handlePressConfirm}
          type={input.isChecked ? 'primary' : 'default'}
        />
      </S.pageWrapper>

      {renderBottomSheet()}
      {renderModal()}
    </>
  );
};

export default SecondPage;

const S = {
  pageWrapper: styled.View`
    flex: 1;
    display: flex;
    flex-direction: column;

    padding-top: 28px;
    padding-right: 16px;
    padding-left: 16px;
    padding-bottom: 28px;
    justify-content: space-between;
  `,
  nicknameAndCheck: styled.View`
    display: flex;
    flex-direction: row;
    gap: 4px;
  `,
  contentsContainer: styled.View`
    display: flex;
    flex-direction: column;
    gap: 32px;
  `,
  description1: styled.Text`
    font-size: 25px;
    font-weight: bold;
    color: black;
  `,
  description2: styled.Text`
    font-size: 18px;
    color: black;
  `,
  inputContainer: styled.View`
    display: flex;
    flex-direction: column;
    gap: 28px;
  `,
  literalNickname: styled.Text`
    padding-left: 12px;
    padding-right: 12px
    color: black;
  `,
  modalCloseButton: styled.Text`
    display: flex;

    padding-top: 12px;
    padding-bottom: 12px;

    border-top-width: 1px;
    border-color: #e1dfdd;

    text-align: center;
  `,
};
