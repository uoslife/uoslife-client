/* eslint-disable consistent-return */
import styled from '@emotion/native';
import React, {useState} from 'react';
import {View} from 'react-native';
import {useAtomValue} from 'jotai';
import {Button, Txt} from '@uoslife/design-system';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {accountFlowAtom, existedAccountInfoAtom} from '../../../atoms/account';

import Header from '../../../components/molecules/common/header/Header';
import Input from '../../../components/molecules/common/forms/input/Input';
import ServiceAgreementOverlay from '../../../components/molecules/screens/account/modalContents/ServiceAgreementOverlay';
import AdvertisingAgreementResult from '../../../components/molecules/screens/account/modalContents/AdvertisingAgreementResult';

import {CoreAPI} from '../../../api/services';
import InputProps from '../../../components/molecules/common/forms/input/Input.type';
import {ErrorResponseType} from '../../../api/services/type';
import useModal from '../../../hooks/useModal';
import UserService from '../../../services/user';
import useAccountFlow from '../../../hooks/useAccountFlow';

type NicknameStatusMessageType =
  | 'BEFORE_CHECK'
  | 'CAN_USE'
  | 'CANNOT_USE'
  | 'DUPLICATED';

const SetNicknameScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();

  const existedAccountInfo = useAtomValue(existedAccountInfoAtom);
  const accountFlow = useAtomValue(accountFlowAtom);
  const {changeAccountFlow, decreaseSignUpFlowStep} = useAccountFlow();

  const isMyPage = route.name === 'Mypage_changeNickname';

  const selectedAccountInfo = existedAccountInfo.find(
    item => item.isSelected === true,
  );
  const [inputValue, setInputValue] = useState(
    selectedAccountInfo?.nickname ?? '',
  );
  const [statusMessage, setStatusMessage] =
    useState<NicknameStatusMessageType>('BEFORE_CHECK');

  const [openBottomSheet, _, BottomSheet] = useModal('BOTTOM_SHEET');
  const [openModal, __, Modal] = useModal('MODAL');

  const handleSetNicknameButton = async () => {
    // TODO: 사용 불가능 닉네임 로직 추가
    // setStatusMessage('CANNOT_USE');

    try {
      const CheckDuplicateUserNicknameRes =
        await CoreAPI.checkDuplicateUserNickname({
          nickname: inputValue,
        });
      if (CheckDuplicateUserNicknameRes.duplicate) {
        setStatusMessage('DUPLICATED');
        return;
      }
      setStatusMessage('CAN_USE');
      if (isMyPage) {
        return;
        // TODO: 닉네임 업데이트 API 연동 필요
      }
      openBottomSheet();
    } catch (err) {
      const error = err as ErrorResponseType;
      console.error(error);
    }
  };

  const [isAdvertismentAgree, setIsAdvertismentAgree] = useState(false);
  const handleClickSubmitBottomSheetButton = async (
    isAdvertismentAgree: boolean,
  ) => {
    setIsAdvertismentAgree(isAdvertismentAgree);
    if (selectedAccountInfo) delete selectedAccountInfo.isSelected;
    try {
      const signUpRes = await CoreAPI.signUp({
        nickname: inputValue,
        tos: {
          privatePolicy: true,
          termsOfUse: true,
          notification: false,
          marketing: isAdvertismentAgree,
        },
        migrationUserInfo: selectedAccountInfo ?? null,
      });
      await UserService.onRegister({
        accessToken: signUpRes.accessToken,
        refreshToken: signUpRes.refreshToken,
        setNotLoggedIn: true,
      });
      openModal();
    } catch (err) {
      console.error(err);
    }
  };
  const handleClickSubmitModalButton = () => {
    changeAccountFlow({
      commonFlowName: 'PORTAL_VERIFICATION',
      isResetSignUpFlow: true,
    });
  };

  const onChangeText = (text: string) => {
    setInputValue(text);
    setStatusMessage('BEFORE_CHECK');
  };
  const onPressInputDelete = () => {
    setInputValue('');
  };

  const handleInputStatusMessage = (status: NicknameStatusMessageType) => {
    switch (status) {
      case 'BEFORE_CHECK':
        return '';
      case 'CANNOT_USE':
        return '사용할 수 없는 닉네임입니다.';
      case 'CAN_USE':
        return '사용 가능한 닉네임입니다.';
      case 'DUPLICATED':
        return '중복되는 닉네임입니다.';
    }
  };
  const handleInputStatus = (
    status: NicknameStatusMessageType,
  ): InputProps['status'] => {
    switch (status) {
      case 'BEFORE_CHECK':
        return 'default';
      case 'CANNOT_USE':
      case 'DUPLICATED':
        return 'error';
      case 'CAN_USE':
        return 'success';
    }
  };

  return (
    <>
      <S.screenContainer
        style={{paddingTop: insets.top, paddingBottom: insets.bottom + 8}}>
        <Header
          label={isMyPage ? '닉네임 변경' : '닉네임 설정'}
          onPressBackButton={() => {
            if (isMyPage) return navigation.goBack();
            switch (accountFlow.signUpFlow.signUpUser) {
              case 'MIGRATION':
                decreaseSignUpFlowStep();
                break;
              case 'DELETED':
                decreaseSignUpFlowStep();
                break;
              case 'NEW':
                changeAccountFlow({commonFlowName: 'SIGNIN'});
                break;
            }
          }}
        />
        <S.setNicknameContainer>
          <View style={{gap: 32}}>
            <View style={{gap: 8}}>
              <Txt
                label={
                  isMyPage
                    ? '변경하실 닉네임을 입력해주세요.'
                    : '사용하실 닉네임을 입력해주세요.'
                }
                color="grey190"
                typograph="headlineMedium"
              />
              <Txt
                label={
                  '닉네임은 최대 8자로 설정 가능합니다.\n한글, 영문, 숫자, 특수기호를 이용해주세요.'
                }
                color="grey190"
                typograph="bodyMedium"
              />
            </View>
            <Input
              onChangeText={onChangeText}
              maxLength={8}
              onPress={onPressInputDelete}
              value={inputValue}
              label="닉네임"
              statusMessage={handleInputStatusMessage(statusMessage)}
              status={handleInputStatus(statusMessage)}
              placeholder="여기에 입력하세요."
            />
          </View>
          <Button
            label="설정하기"
            onPress={handleSetNicknameButton}
            isEnabled={!!inputValue}
            isFullWidth
          />
        </S.setNicknameContainer>
      </S.screenContainer>
      <BottomSheet>
        <ServiceAgreementOverlay
          handleClickSubmitBottomSheetButton={
            handleClickSubmitBottomSheetButton
          }
        />
      </BottomSheet>
      <Modal>
        <AdvertisingAgreementResult
          isAgree={isAdvertismentAgree}
          handleClickSubmitModalButton={handleClickSubmitModalButton}
        />
      </Modal>
    </>
  );
};

export default SetNicknameScreen;

const S = {
  screenContainer: styled.View`
    flex: 1;
  `,
  setNicknameContainer: styled.View`
    flex: 1;
    justify-content: space-between;
    padding: 28px 16px 0;
  `,
};
