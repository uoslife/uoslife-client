/* eslint-disable consistent-return */
import styled from '@emotion/native';
import React, {useState} from 'react';
import {View} from 'react-native';
import {useAtomValue} from 'jotai';
import {Button, Txt} from '@uoslife/design-system';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useThrottle} from '@uoslife/react';
import {
  accountFlowAtom,
  deletedUserStatusAtom,
  existedAccountInfoAtom,
} from '../../../store/account';

import Header from '../../../components/molecules/common/header/Header';
import Input from '../../../components/molecules/common/forms/input/Input';
import ServiceAgreementOverlay from '../../../components/molecules/screens/account/modalContents/ServiceAgreementOverlay';
import AdvertisingAgreementResult from '../../../components/molecules/screens/account/modalContents/AdvertisingAgreementResult';

import {CoreAPI} from '../../../api/services';
import InputProps from '../../../components/molecules/common/forms/input/Input.type';
import useModal from '../../../hooks/useModal';
import UserService from '../../../services/user';
import useAccountFlow from '../../../hooks/useAccountFlow';
import customShowToast from '../../../configs/toast';
import useUserState from '../../../hooks/useUserState';
import useIsCurrentScreen from '../../../hooks/useIsCurrentScreen';
import NotificationService from '../../../services/notification';
import {ErrorResponseType} from '../../../api/services/type';

const NICKNAME_MAX_LENGTH = 8;

type NicknameStatusMessageType =
  | 'BEFORE_CHECK'
  | 'CAN_USE'
  | 'CANNOT_USE'
  | 'DUPLICATED';

const SetNicknameScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const existedAccountInfo = useAtomValue(existedAccountInfoAtom);
  const accountFlow = useAtomValue(accountFlowAtom);
  const {isDelete} = useAtomValue(deletedUserStatusAtom);
  const {changeAccountFlow, decreaseSignUpFlowStep} = useAccountFlow();
  const {setUserInfo} = useUserState();

  const [isMyPage] = useIsCurrentScreen('Mypage_changeNickname');

  const selectedAccountInfo = existedAccountInfo.find(
    item => item.isSelected === true,
  );
  const [inputValue, setInputValue] = useState(
    selectedAccountInfo?.nickname ?? '',
  );
  const [statusMessage, setStatusMessage] =
    useState<NicknameStatusMessageType>('BEFORE_CHECK');

  const [openBottomSheet, , BottomSheet] = useModal('BOTTOM_SHEET');
  const [openModal, , Modal] = useModal('MODAL');

  const handleSetNicknameButton = async () => {
    if (inputValue.length > NICKNAME_MAX_LENGTH) {
      setStatusMessage('CANNOT_USE');
      return;
    }

    if (
      accountFlow.signUpFlow.signUpUser === 'MIGRATION' &&
      selectedAccountInfo?.nickname === inputValue
    ) {
      openBottomSheet();
      return;
    }

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
        try {
          await CoreAPI.changeNickname({nickname: inputValue});
          await UserService.updateUserInfo(setUserInfo);
          customShowToast('changeNickname');
          navigation.goBack();
        } catch (error) {
          console.log(error);
          customShowToast('changeNicknameError');
        }
        return;
      }
      openBottomSheet();
    } catch (err) {
      console.error(err);
    }
  };

  const [isAdvertismentAgree, setIsAdvertismentAgree] = useState(false);
  const handleClickSubmitBottomSheetButton = useThrottle(
    async (isAdvertismentAgreeChecked: boolean) => {
      const isAuthorized =
        await NotificationService.checkPermissionIsAuthorizedStatus();
      setIsAdvertismentAgree(isAdvertismentAgreeChecked);
      if (selectedAccountInfo) delete selectedAccountInfo.isSelected;
      try {
        const signUpRes = await CoreAPI.signUp({
          nickname: inputValue,
          tos: {
            privatePolicy: true,
            termsOfUse: true,
            notification: isAuthorized,
            marketing: isAdvertismentAgreeChecked,
          },
          migrationUserInfo: selectedAccountInfo ?? null,
          isDelete,
        });
        await UserService.onRegister({
          accessToken: signUpRes.accessToken,
          refreshToken: signUpRes.refreshToken,
          setUserInfo,
          setNotLoggedIn: true,
        });
        openModal();
      } catch (err) {
        const error = err as ErrorResponseType;
        if (error.code === 'CS01') {
          customShowToast('unRegisterTwiceUserError');
          return;
        }
        customShowToast('signUpError');
      }
    },
  );

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
              maxLength={NICKNAME_MAX_LENGTH}
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
