import styled from '@emotion/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import BottomSheet from '../../../components/modals/BottomSheet';
import Modal from '../../../components/modals/Modal';
import AgreementToTerms from '../../../components/contents/AgreementToTerms';
import AgreementProcessResult from '../../../components/contents/AgreementProcessResult';
import {useSetAtom} from 'jotai';
import {accountStatusAtom} from '..';
import {Button, Txt} from '@uoslife/design-system';
import Header from '../../../components/header/Header';
import Input from '../../../components/forms/input/Input';

const SetNicknameScreen = () => {
  const [inputValue, setInputValue] = useState('');
  const [isBottomSheetOpened, setIsBottomSheetOpened] =
    useState<boolean>(false);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const openModal = () => {
    setIsModalOpened(true);
  };

  const openBottomSheet = () => {
    setIsBottomSheetOpened(true);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetOpened(false);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };
  const setAccountStatus = useSetAtom(accountStatusAtom);
  const handleBottomSheetButton = () => {
    setAccountStatus(prev => {
      return {
        ...prev,
        portalStatus: {isPortalStep: true, step: 0},
      };
    });
  };

  const handleStatusMessage = (status: string) => {
    switch (status) {
      case 'codeError':
        return '사용할 수 없는 닉네임입니다.';
      case 'successNickname':
        return '사용 가능한 닉네임입니다.';
      case 'duplicateedNickname':
        return '중복되는 닉네임입니다.';
      default:
        return '';
    }
  };

  useEffect(() => {
    // 기존 유저일 시, input의 status 변경 로직 추가.
  }, []);

  return (
    <>
      <S.screenContainer>
        <Header label={'닉네임 설정'} />
        <S.setNicknameContainer>
          <View style={{gap: 32}}>
            <View style={{gap: 8}}>
              <Txt
                label={'사용하실 닉네임을 입력해주세요.'}
                color={'grey190'}
                typograph={'headlineMedium'}
              />
              <Txt
                label={
                  '닉네임은 최대 8자로 설정 가능합니다.\n한글, 영문, 숫자, 특수기호를 이용해주세요.'
                }
                color={'grey190'}
                typograph={'bodyMedium'}
              />
            </View>
            <Input
              onChangeText={text => setInputValue(text)}
              maxLength={8}
              onPress={() => setInputValue('')}
              value={inputValue}
              label={'닉네임'}
              statusMessage={handleStatusMessage(statusMessage)}
              status={'default'}
              placeholder={'여기에 입력하세요.'}
            />
          </View>
          <Button
            label={'설정하기'}
            onPress={openBottomSheet}
            isEnabled={!!inputValue}
            isFullWidth={true}
          />
        </S.setNicknameContainer>
      </S.screenContainer>
      {isBottomSheetOpened && (
        <BottomSheet
          zIndex={1}
          onBackgroundPress={closeBottomSheet}
          darkBackground={!isModalOpened}>
          <AgreementToTerms
            openModal={openModal}
            handleBottomSheetButton={handleBottomSheetButton}
          />
        </BottomSheet>
      )}
      {isModalOpened && (
        <Modal onClose={closeModal} zIndex={3} darkBackground>
          <AgreementProcessResult />
        </Modal>
      )}
    </>
  );
};

export default SetNicknameScreen;

const S = {
  screenContainer: styled.View`
    flex: 1;
    padding: 28px 16px;
    justify-content: space-between;
  `,
  setNicknameContainer: styled.View`
    flex: 1;
    justify-content: space-between;
    padding: 42px 16px;
  `,
};
